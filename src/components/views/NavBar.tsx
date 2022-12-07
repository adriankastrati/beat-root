import { useState } from "react"
import { Link } from "react-router-dom";
import { NavContainer, TopNav, NavBurgerIcon, NavIcon, NavLogo, NavMenu, NavItem, NavLink } from "./common/NavBarElements"



export default function NavBar(){

    const [burgerOpen, setBurgerOpen] = useState<boolean>(false)
    {console.log(burgerOpen)}

    const [currentPageName, setCurrentPageName] = useState<string>("current page")

    
    const clickHandler = () => {
        setBurgerOpen(!burgerOpen)
    }

    return (
        <>
        <TopNav> 
            <NavContainer>
                <NavLogo to="/" onClick={()=>{}}> 
                    {currentPageName}
                </NavLogo>

                <NavBurgerIcon onClick={(a)=>{clickHandler()}}>
                    {burgerOpen? "cross":"burger"}
                </NavBurgerIcon>

                <NavMenu active={burgerOpen} >
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