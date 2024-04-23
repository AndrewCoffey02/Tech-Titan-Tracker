import React from 'react';
import ReactDOM from 'react-dom/client';
import DashBoard from './Dashboard.js'
import BarChart from './Components/BarChart/BarView'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BarChart />
  </React.StrictMode>
);