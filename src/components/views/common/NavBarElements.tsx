import { Link } from "react-router-dom";
import styled from "styled-components";
import { textStyles, TextVariant, theme } from "../../../common";

interface NavBarProps {
    active: boolean
}
export const Frame = styled.div`
margin-top: 80px;
`
interface BlankSpaceProps{
    width?:number
    height?:number
}
export const BlankSpace = styled.div<BlankSpaceProps>`
height: 1px;
margin-bottom:${props=>props.height?props.height:1}px;
width: ${props=>props.width?props.width:1}px;
`
// topnav wrapper
export const TopNav = styled.div<NavBarProps>`
    display:flex;
    background-color: ${theme.light};
    width: 100vw;
    opacity: 1;
    top: 0;
    z-index: 9;
    position:fixed;
`;

// topnav higher z-index
export const NavContainer = styled.div<NavBarProps>`
    display: flex;
    justify-content: space-between;
    width: 200%; // why 
    height: 4rem;
    background-color: ${theme.white};
    margin-bottom: 2px;
    z-index: 10;
`;

// logo
export const NavLogo = styled(Link)`
    display: flex
    text-align: center;
    justify-self: flex-start;
    cursor: pointer; 
    text-decoration: none;
    font-weight: 300;
`;

// text of current page in navbar
export const NavCurrentPage = styled.div`
    /* display: flex;
    align-items: center;
    margin-top: 1vw;
    justify-self: flex-start;
    cursor: pointer; 
    text-decoration: none;
    text-align:center
    font-weight: 300;
    color: black;
    z-index: 10; */
    margin-top:20px;
    text-align: center;
    width:100%;
    ${textStyles(TextVariant.SUBTITLE)}
`;

// the burger button
export const NavBurgerIcon = styled.button`
    text-align: left;
    z-index:12;
`;

// the sliding menu
export const NavMenu = styled.ul<NavBarProps>`
    list-style: none;
    text-align: center;
    justify-content: flex-start;
    top:32px;
    z-index: 10;
    @media screen {
        transform: translateY(1rem);
        flex-direction: column;
        width: 120vh;
        height: 120vh;
        position: absolute;
        right: ${props => !props.active ? "-130vh":"-100vh"};
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
    transform: translateY(3rem);
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