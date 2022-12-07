import { useState } from "react"
import { Link } from "react-router-dom";
import { NavContainer, TopNav, NavBurgerIcon, NavIcon, NavLogo, NavMenu, NavItem, NavLink } from "./common/NavBarElements"



export default function NavBar(){

    const [burgerState, setBurgerOpen] = useState<boolean>(false)
    {console.log(burgerState)}

    const [currentPageName, setCurrentPageName] = useState<string>("current page")

    
    const clickHandler = () => {
        setBurgerOpen(!burgerState)
    }

    return (
        <>
        <TopNav active={burgerState}> 
            <NavContainer>
                <NavLogo to="/" onClick={()=>{}}> 
                    {currentPageName}
                </NavLogo>

                <NavMenu active={burgerState}>

                    <NavItem>
                    <NavBurgerIcon onClick={()=>{clickHandler()}}>
                        {burgerState? "cross":"burger"}
                    </NavBurgerIcon>
                    </NavItem>

                    <NavItem>
                        <NavLink to="/play/create">create</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/play/explore">explore</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/">home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/test/firebase">firebase test</NavLink>
                    </NavItem>
                </NavMenu>
            </NavContainer>
        </TopNav>
        </>
    )
}