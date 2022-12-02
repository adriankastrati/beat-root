import { BrowserRouter, Route, Switch} from "react-router-dom";
import AudioInitializer from "./components/presenters/AudioInitializer";
import NavBar from "./components/views/NavBar";
import BeatPage from "./pages/BeatPage";
import RootPage from "./pages/RootPage";

export default function App(){
    return <BrowserRouter>
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <RootPage/>
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
                                <div>add create page here</div>
                            </Route>
                        </Switch>
                    </AudioInitializer>
                </Route>

            </Switch>
        </div>
    </BrowserRouter>
}