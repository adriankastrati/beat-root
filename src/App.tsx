import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToneJSExperiment from './components/ToneJSExperiment';
import DrawFeed from './components/Feed/DrawFeed';

function App() {
  return (
    <div className="App">
      <DrawFeed/>
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
