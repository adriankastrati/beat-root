import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToneJSExperiment from './components/ToneJSExperiment';

import FeedPresenter, { Feed } from './components/Feed/FeedPresenter';

function App() {
  
  return (
    <div>
      <FeedPresenter />
    </div>
  );
}
//function App() {
//  return (
//    <div className="App">
//      <ToneJSExperiment/>
//    </div>
//  );
//}

export default App;
