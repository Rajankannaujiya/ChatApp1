import * as React from 'react';
import ReactDOM from 'react-dom/client';
// import 'react-app-polyfill/ie9';
// import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>

    <App />
  </BrowserRouter>
  </React.StrictMode> 
);

// reportWebVitals();
