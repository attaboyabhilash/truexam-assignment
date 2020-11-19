import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContextProvider from './contexts/FirebaseContext'
import GlobalContextProvider from './contexts/GlobalContext'


ReactDOM.render(
  <FirebaseContextProvider>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </FirebaseContextProvider>,
  document.getElementById('root')
);

