let inputCode = "GME";
let check = true;
var searchTerm = "gamestop";
var beginDate = "20200101";
const API_KEY = [];//["1PR7G7BXJJWPYLB8","RITOKDFR9LNEYJSV", "A4SQV1UMXB5SCEKB", "1YN7FOIXLEU0AOPY", "QGV5NT0BMJ1S7TGR"];
const NYT_API = "KBOQGNQODf5P6fHZkRni7MTpFB7GZ5Md";

function getInputValue(){
  inputCode = document.getElementById("inputData").value;
  if (check == false) {
    alert("please input again after the reload");
    window.location.reload();
  } else {
    alert("Confirm: " + inputCode);
  }
  fetchStockInfo(); // get the information of the company
  makeChart(); // make the stock chart
}

function fetchStockInfo() {
  let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${inputCode}&apikey=${API_KEY[Math.floor(Math.random() * API_KEY.length)]}`;
    fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
        console.log(data)
        if (typeof data.Name !== "undefined") {
          document.getElementById("stock-title").innerHTML = "💲" + data.Name + " Stock";
          searchTerm = data.Name.trim().split(" ").join("-");
          console.log(searchTerm);
          fetchNews();
        } else {
          document.getElementById("stock-title").innerHTML = "💲" + inputCode + " Stock";
          searchTerm = inputCode;
          console.log(searchTerm);
          fetchNews();
        }
        
        if (typeof data.Description !== "undefined") {
          document.getElementById("stock-description").innerHTML = data.Description
        } else {
          document.getElementById("stock-description").innerHTML = "The API is yeeting me 😭 please wait for 1 minute and try again"
        }
        
        });
  }

function makeChart(){
  
  let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${inputCode}&outputsize=compact&apikey=${API_KEY[Math.floor(Math.random() * API_KEY.length)]}`;
  fetch(API_CALL)
  .then((resp) => resp.json())
  .then(function(data) {
    //console.table(data["Time Series (Daily)"])
  
  let date = []
  let open = []
  let close = []
  
  for (var item in data["Time Series (Daily)"]) {
    date.push(item)
    open.push(data["Time Series (Daily)"][item]["1. open"])
    close.push(data["Time Series (Daily)"][item]["4. close"])
    console.log(data["Time Series (Daily)"][item])
  }
  console.log(date)
  console.log(open)
  console.log(close)

  date = date.reverse();
  open = open.reverse();
  close = close.reverse();
  if (date.length == 0) {
    alert("Please wait for 1 minutes and input again. We are using free API so the limit is only 1 call per minute 😭")
  } else {
    var beginDate = date[0].split('-').join("");
    console.log(beginDate);
    fetchNews();
  }
  var data = {
    labels: date,
    datasets: [{
        label: "Opening Price",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,255,20,0.4)",
        borderColor: "#39FF14", // The main line color
        borderCapStyle: 'square',
        borderWidth: 3,
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 0.5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#39FF14",
        pointHoverBorderColor: "#39FF14",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 2,
        // notice the gap in the data and the spanGaps: true
        data: open,
        spanGaps: true,
      }, {
        label: "Closing Price",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "red", // The main line color
        borderCapStyle: 'square',
        borderWidth: 3,
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 0.5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 2,
        // notice the gap in the data and the spanGaps: true
        data: close,
        spanGaps: true,
      }
    ]
  };
  check = false;
  var ctx = document.getElementById('myChart1');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          scales: {
              y: {
                  beginAtZero: false
              }
          }
      }
  });
})
}

function fetchNews() {
  console.log("check: " + beginDate);
  console.log(searchTerm);
  let NYT_API_CALL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?&begin-date=${beginDate}&q=${searchTerm}&sort=relevance&api-key=${NYT_API}`;
  console.log(NYT_API_CALL);
  fetch(NYT_API_CALL)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log("HERE");
    console.log(data);
    document.getElementById("news-source").innerHTML = data.copyright;
    var articles = data.response.docs;
    document.getElementById("output").innerHTML = "";
    for (var i = 0; i < articles.length; i++) {
      document.getElementById("output").innerHTML += 
      `<a href="${articles[i].web_url}"style="text-decoration: none"><div class="news-box" style='padding-top: 10px;'><img src="https://www.nytimes.com/${articles[i].multimedia[0].url}" style="float: left; height: 100px; padding: 10px;"alt="${articles[i].multimedia[0].url}"/><h3>${articles[i].headline.main}</h3><h4>${articles[i].pub_date}</h4><p>${articles[i].snippet}<p><p>${articles[i].lead_paragraph}</p></div></a>`;
    }
  })
}