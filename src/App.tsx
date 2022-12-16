import { BrowserRouter, Route, Switch} from "react-router-dom";
import AudioInitializer from "./components/presenters/AudioInitializer";
import NavBar from "./components/views/NavBar";
import ColorTestPage from "./pages/colorTestPage";
import ManualFirebaseTest from "./pages/ManualFirebaseTest";
import RootPage from "./pages/RootPage";
import SignInTest from "./pages/signInTest";
import styled from "styled-components";
import UserPage from "./pages/UserPage";
import AboutPage from "pages/AboutPage";
import CreatePage from "pages/CreatePage";
import ExplorePage from "pages/ExplorePage";

const MainDiv = styled.div/*<MainProps>*/`
    
}
`/*
interface MainProps{
    active:boolean
}*/

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

                <Route exact path="/test/color">
                    <ColorTestPage/>
                </Route>

                <Route exact path="/sign-in">
                    <SignInTest/>
                </Route>

                <Route exact path="/user-page">
                    <UserPage/>
                </Route>
                <Route exact path="/about">
                    <AboutPage/>
                </Route>
                
                <Route path="/play">
                    <AudioInitializer>
                        <Switch>

                            <Route exact path="/play/explore">
                                <ExplorePage/>
                            </Route>

                            <Route exact path="/play/create">
                                <CreatePage/>
                            </Route>
                        </Switch>
                    </AudioInitializer>
                </Route>

            </Switch>
        </div>
    </BrowserRouter>
}