import { useEffect, useState } from "react"
import { useLocation } from "react-use"
import MainButton, { MainButtonType } from "./common/MainButton"
import { NavContainer, Frame, TopNav, NavCurrentPage, NavBurgerIcon, NavIcon, NavLogo, NavMenu, NavItem, NavLink, BlankSpace } from "./common/NavBarElements"
import { textStyles, theme } from "../../common";
import { isUserLoggedIn, logOutAccount } from "model/firebase/firebaseAuthenticationModel";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
// TODO: navbar permanently fixed at top when scrolling
// TODO: current site to display at top
// TODO: burger button as actual burger -> cross
// TODO: make it stable
// TODO: separate into presenter/view

export default function NavBar(){
    const [burgerState, setBurgerOpen] = useState<boolean>(false)
    const [currentPageName, setCurrentPageName] = useState<string>()
    const [loggedStatus, setLoggedStatus] = useState<boolean>(true)
    const absPath = window.location.pathname
    const { pathname } = useLocation()
    const splitPathname = pathname?.split("/")

 
   
   

    const clickHandler = () => {
        isUserLoggedIn().then((acc)=>{
            setLoggedStatus(acc)
        })
        setBurgerOpen(!burgerState)
        console.log(1)
    }

    // "/" = home, which isn't undefined.
    const locationHandler = () => {
        splitPathname ? 
            setCurrentPageName(splitPathname[2]):setCurrentPageName("home")
    }

    //const headerNameFix = (e:any) => {
    //    e === "/" ? setCurrentPageName("home") : setCurrentPageName(e)
    //}


    useEffect(locationHandler,[absPath])
    

    return (<Frame>
                <TopNav active={burgerState}> 
                    <NavContainer active={burgerState}>
                        <NavLogo to="/" onClick={()=>{}}> 
                        logo 
                        </NavLogo>
                        <BlankSpace width={40}></BlankSpace>
                        <NavCurrentPage>
                        <p>{currentPageName}</p>
                        </NavCurrentPage>
                        <BlankSpace width={0}></BlankSpace>
                        {burgerState? 
                        <MainButton type = {MainButtonType.Cross} scale = {1} text = "" onClick={clickHandler} frameOff={true} backgroundColor={theme.medium}></MainButton>:
                        <MainButton type = {MainButtonType.Burger} scale = {1} text = "" onClick={clickHandler} frameOff={true} backgroundColor={theme.medium}></MainButton>}
                        

                        <NavMenu active={burgerState}>
                            <NavItem>
                                <NavLink to="/"onClick={()=>{clickHandler()}}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/play/explore" onClick={()=>{clickHandler()}}>Explore</NavLink>
                            </NavItem>
                            
                           {loggedStatus?
                           <div>
                            <NavItem>
                                <NavLink to="/user-page"onClick={()=>{clickHandler()}}>Profile Page</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/play/create" onClick={()=>{clickHandler()}}>Create</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/play/explore" onClick={()=>{
                                    logOutAccount();
                                    clickHandler()
                                    
                                }}>Log Out</NavLink>
                            </NavItem>
                            </div>: 
                            <NavItem>
                                <NavLink to="/sign-in"onClick={()=>{clickHandler()}}>Log In</NavLink>
                            </NavItem>
                            }
                           
                           <NavItem>
                                <NavLink to="/about"onClick={()=>{clickHandler()}}>About</NavLink>
                            </NavItem>

                           
                        </NavMenu>
                    </NavContainer>
                </TopNav>
        </Frame>
    )
}

function auth() {
    throw new Error("Function not implemented.");
}
