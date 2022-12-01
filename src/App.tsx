import './App.css';
<<<<<<< HEAD
import BeatDetailPresenter from './components/presenters/BeatDetailPresenter';
import ModelContext from './contexts/ModelContext';
import Model from './model';
=======
import MainButton, { MainButtonType } from './button';
>>>>>>> be24aeb30819b8fc5bdf9ed589dd890f42931f56

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <ModelContext.Provider value={new Model()}>

        <BeatDetailPresenter/>

      </ModelContext.Provider>
=======
      <MainButton type={MainButtonType.ChooseColorTheme} text = "pick color theme"></MainButton>
      <MainButton type={MainButtonType.Edit} text = "edit"></MainButton>
      <MainButton type={MainButtonType.Create} text = "add sample"></MainButton>
>>>>>>> be24aeb30819b8fc5bdf9ed589dd890f42931f56
    </div>
  );
}

export default App;
