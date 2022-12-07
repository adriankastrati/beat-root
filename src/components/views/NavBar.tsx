import { Link } from "react-router-dom";

export default function NavBar(){
    return <div>
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
        
        <li>
            <Link to="/test/color">color test</Link>
        </li>
        <li>
            <Link to="/test/sign-in">Sign in test</Link>
        </li>
    </div>
}