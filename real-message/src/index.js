import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // Moving Js Files within subfolders to avoid Code Clutter
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
