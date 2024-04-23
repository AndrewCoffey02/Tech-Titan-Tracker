import React from 'react';
import ReactDOM from 'react-dom/client';
import DashBoard from './Dashboard.js'
import LineChart from './Components/LineChart/LineChart.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DashBoard />
  </React.StrictMode>
);