import { useEffect, useState } from "react"
import { useLocation } from "react-use"
import MainButton, { MainButtonType } from "./common/MainButton"
import { NavContainer, Frame, TopNav, NavCurrentPage, NavBurgerIcon, NavIcon, NavLogo, NavMenu, NavItem, NavLink } from "./common/NavBarElements"
import { textStyles, theme } from "../../common";
// TODO: navbar permanently fixed at top when scrolling
// TODO: current site to display at top
// TODO: burger button as actual burger -> cross
// TODO: make it stable
// TODO: separate into presenter/view

export default function NavBar(){
    const [burgerState, setBurgerOpen] = useState<boolean>(false)
    const [currentPageName, setCurrentPageName] = useState<string>()
    const absPath = window.location.pathname
    const { pathname } = useLocation()
    const splitPathname = pathname?.split("/")

    const clickHandler = () => {
        setBurgerOpen(!burgerState)
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
                        <NavCurrentPage>
                        {currentPageName}
                        </NavCurrentPage>
                        
                        {burgerState? 
                        <MainButton type = {MainButtonType.Cross} scale = {0.5} text = "" onClick={clickHandler} frameOff={true} backgroundColor={theme.medium}></MainButton>:
                        <MainButton type = {MainButtonType.Burger} scale = {0.5} text = "" onClick={clickHandler} frameOff={true} backgroundColor={theme.medium}></MainButton>}
                        

                        <NavMenu active={burgerState}>
                            <NavItem>
                                <NavLink to="/play/create" onClick={()=>{clickHandler()}}>create</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/play/explore"onClick={()=>{clickHandler()}}>explore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/"onClick={()=>{clickHandler()}}>home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/test/firebase"onClick={()=>{clickHandler()}}>firebase test</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/test/sign-in"onClick={()=>{clickHandler()}}>test sign-in</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/test/user-page"onClick={()=>{clickHandler()}}>test user-page</NavLink>
                            </NavItem>
                        </NavMenu>
                    </NavContainer>
                </TopNav>
        </Frame>
    )
}