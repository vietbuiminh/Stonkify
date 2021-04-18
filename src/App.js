import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="news-app">
        <h2>📰Related News</h2>
        <div id="output"></div>
        <div id="news-source"></div>
      </div>
      <div className="stock-app">
        <h2 id="stock-title">Loading</h2>
        <p id="update-time"></p>
        <canvas id="myChart1" height="200"></canvas>
      </div>
      <div className="stock-company-info">
        <h2>🌐Company Description</h2>
        <p id="stock-description">loading</p>
      </div>
      <div className="inside-info">
        <h2>🤔Inside Info</h2>
        <div id="info-output"></div>
      </div>
    </div>
    
  );
}

export default App;
