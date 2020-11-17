import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContextProvider from './contexts/FirebaseContext'


ReactDOM.render(
  <FirebaseContextProvider>
    <App />
  </FirebaseContextProvider>,
  document.getElementById('root')
);

