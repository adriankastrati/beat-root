import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavBarProps {
    active: boolean
}

export const NavBurgerIcon = styled.button`
    display: none;
    transform: translateX(-200%);
    @media screen {
        display: block;
        position: absolute;
        top: 0;
        font-size: 1rem;
        cursor: pointer;
    }
    
`;
export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    height: 100%;
`;

export const NavLogo = styled(Link)`
    display: flex
    text-align: center;
    align-items: center;
    justify-self: flex-start;
    color: #fff;
    cursor: pointer; 
    text-decoration: none;
    font-weight: 300;

`;

export const TopNav = styled.div<NavBarProps>`
    display: flex;
    background-color: blue;
    font-size: 2rem;
    width: 50vw;
    position: sticky;
    opacity: 1;
    top: 0;
    @media screen {
        flex-direction: column;
        transition: 0.5s all ease;
    };
    z-index: 199;
`;

export const NavIcon = styled.button`
    margin: 0 0.5rem;
    font-size: 1.6rem;
    align-items: left;
    text-align: left;
`;

export const NavMenu = styled.ul<NavBarProps>`
    display: flex;
    z-index: 200;
    align-items: center;
    list-style: none;
    text-align: center;
    @media screen {
        flex-direction: column;
        width: 100vh;
        height: 100vh;
        position: absolute;
        left: ${({active}) => (!active ? "180%":"100%")};
        opacity: 1;
        transition: all 0.2s ease;
        //background: #CCD6A6;
        //background: #393E46;
        background: orange;
    }
`;
export const NavItem = styled.li`
    height: 3rem;
    @media screen {
        width: 100%;
    }
`;

export const NavLink = styled(Link)`
    color: #ffffff;
    display: flex;
    align-items: center;
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