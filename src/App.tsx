import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainButton, { MainButtonType } from './button';

function App() {
  return (
    <div className="App">
      <MainButton type={MainButtonType.ChooseColorTheme} text = "pick color theme"></MainButton>
      <MainButton type={MainButtonType.Edit} text = "edit"></MainButton>
      <MainButton type={MainButtonType.Create} text = "add sample"></MainButton>
    </div>
  );
}

export default App;
