import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ModelContext from './contexts/ModelContext';
import Model from './model';
import AudioInitializer from './components/presenters/AudioInitializer';
import App from './App';

ReactDOM.createRoot(document.getElementById("root")!).render(
  //NOTE: react strictmode is disabled due to bug in react-router.. Re-enabling might be handy for debugging
    <ModelContext.Provider value={new Model()}>
      <App/>
    </ModelContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
