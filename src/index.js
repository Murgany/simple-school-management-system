import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import "./i18n"


//axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

//below part is for production
const API_MEDIA_URL = "https://simple-school-system.herokuapp.com";
axios.defaults.baseURL = "https://simple-school-system.herokuapp.com/api/"

export default API_MEDIA_URL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
