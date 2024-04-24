import React from 'react';
import ReactDOM from 'react-dom/client';
import DashBoard from './Dashboard'
import LineChart from './Components/LineChart/LineView'
import BarChart from './Components/BarChart/BarView'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DashBoard />
  </React.StrictMode>
);