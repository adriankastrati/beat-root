import './App.css';
import BeatDetailPresenter from './components/presenters/BeatDetailPresenter';
import ModelContext from './contexts/ModelContext';
import Model from './model';

function App() {
  return (
    <div className="App">
      <ModelContext.Provider value={new Model()}>

        <BeatDetailPresenter/>

      </ModelContext.Provider>
    </div>
  );
}

export default App;
