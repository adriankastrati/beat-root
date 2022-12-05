import { BrowserRouter, Route, Switch} from "react-router-dom";
import AudioInitializer from "./components/presenters/AudioInitializer";
import BeatCreatePresenter from "./components/presenters/BeatCreatePresenter";
import NavBar from "./components/views/NavBar";
import BeatPage from "./pages/BeatPage";
import ManualFirebaseTest from "./pages/ManualFirebaseTest";
import RootPage from "./pages/RootPage";

export default function App(){
    return <BrowserRouter>
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <RootPage/>
                </Route>

                <Route exact path="/test/firebase">
                    <ManualFirebaseTest/>
                </Route>
                
                <Route path="/play">
                    <AudioInitializer>
                        <Switch>
                            <Route exact path="/play/beat/:beatID">
                                <BeatPage/>
                            </Route>

                            <Route exact path="/play/explore">
                                <div>add explore page here</div>
                            </Route>

                            <Route exact path="/play/create">
                                <BeatCreatePresenter/>
                            </Route>
                        </Switch>
                    </AudioInitializer>
                </Route>

            </Switch>
        </div>
    </BrowserRouter>
}