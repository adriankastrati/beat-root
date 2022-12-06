import { useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";



export default function NavBar(){
    const [burgerOpen, setBurgerOpen] = useState(false)

    const burgerItem = styled.div`

    `;

    const navigation = styled.div`
        display: ${burgerOpen ? 'inline' : 'none'};
        background-color: purple;
        height: 50vw;
        width: 50vw;
        margin-top: 50px;
        position: absolute;
    `;

    return (
        <div> 
            <li>
                <Link to="/play/explore">explore</Link>
            </li>
            <li>
                <Link to="/play/create">create</Link>
            </li>
            <li>
                <Link to="/">home</Link>
            </li>
            <li>
                <Link to="/test/firebase">firebase test</Link>
            </li>

            <div className={burgerItem}>

            </div >


        </div>
    )
}