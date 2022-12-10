import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavBarProps {
    active: boolean
}

// topnav wrapper
export const TopNav = styled.div<NavBarProps>`
    display:flex;
    background-color: blue;
    width: 50vw;
    position: sticky;
    opacity: 1;
    top: 0;
    @media screen {
        flex-direction: column;
        transition: 0.5s all ease;
    };
    z-index: 999;
`;

export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200%; // why 
    height: 2rem;
    background-color: #FEFCF3;
`;

export const NavLogo = styled(Link)`
    display: flex
    text-align: center;
    justify-self: flex-start;
    color: #fff;
    cursor: pointer; 
    text-decoration: none;
    font-weight: 300;
    background-color: #023020;
`;

// text of current page in navbar
export const NavCurrentPage = styled.div`
    text-align: center;
    justify-self: flex-start;
    cursor: pointer; 
    text-decoration: none;
    font-weight: 300;
    color: black;
`;

// the burger button
export const NavBurgerIcon = styled.button`
    text-align: left;
    display: flex;
`;

// the sliding menu
export const NavMenu = styled.ul<NavBarProps>`
    display: flex;
    list-style: none;
    text-align: center;
    transform: translateY(1rem);
    justify-content: flex-start;
    @media screen {
        flex-direction: column;
        width: 100vh;
        height: 100vh;
        position: absolute;
        left: ${({active}) => (!active ? "200%":"140%")};
        opacity: 0.95;
        transition: all 0.2s ease;
        background: #434242;
    }
`;


export const NavIcon = styled.button`
`;

// wrapper for links
export const NavItem = styled.li`
    height: 3rem;
    @media screen {
        width: 100%;
    }
`;

// the links
export const NavLink = styled(Link)`
    color: #ffffff;
    display: flex;
    text-decoration: none;
    height: 80%;
    @media screen {
        text-align: left;
        width: 100%;
        &:hover {
            color: #8D72E1;
            transition: all 0.1s ease;
            //background: #aae320;
        }
    }
`;