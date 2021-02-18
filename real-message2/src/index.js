import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // This is what it looks like to Import Files that are stored 
// in sub folders
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

