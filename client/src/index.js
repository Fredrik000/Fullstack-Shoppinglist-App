import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Importing the Bootstrap CSS - Custom theme
import './styles/main.css';

// Importing the Bootstrap CSS - only use if no custom theme
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
