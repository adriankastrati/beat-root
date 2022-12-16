import { BrowserRouter, Route, Switch} from "react-router-dom";
import AudioInitializer from "./components/presenters/AudioInitializer";
import BeatCreatePresenter from "./components/presenters/BeatCreatePresenter";
import ColorBoxPresenter from "./components/presenters/ColorBoxPresenter";
import FeedPresenter from "./components/presenters/FeedPresenter";
import ColorBoxView from "./components/views/ColorBoxView";
import NavBar from "./components/views/NavBar";
import ColorTestPage from "./pages/colorTestPage";
import ManualFirebaseTest from "./pages/ManualFirebaseTest";
import RootPage from "./pages/RootPage";
import SignInTest from "./pages/signInTest";
import React from "react";
import styled from "styled-components";
import UserPage from "./pages/UserPage";
import CreatePage from "pages/CreatePage";

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

                <Route exact path="/test/sign-in">
                    <SignInTest/>
                </Route>

                <Route exact path="/test/user-page">
                    <UserPage/>
                </Route>
                
                <Route path="/play">
                    <AudioInitializer>
                        <Switch>

                            <Route exact path="/play/explore">
                                <FeedPresenter userFeed={false}/>
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