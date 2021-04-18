import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import NewsItem from './NewsItem';


const NewsList = () => {
    const [articles, setarticles] = useState([])

    useEffect(() => {
        const getArticles = async() => {
            const res = await Axios.get(
                "https://newsapi.org/v2/everything?q=tesla&from=2021-03-17&sortBy=publishedAt&apiKey=2d5e8445cb0f4852a1b80b99b7e94118"
            )

            setarticles(res.data.articles);
            console.log(res)
        }

        getArticles();
    }, []);

    return(
        <div>
            {articles.map(({title, description, url, urlToImage}) => (
                <NewsItem title={title} description={description} url={url} urlToImage={urlToImage} />
            ))}
        </div>
    )
}
export default NewsList;