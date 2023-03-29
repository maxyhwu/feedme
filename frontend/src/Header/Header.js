import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import FeedMe from '../assets/FeedMe.jpg';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

/* <Link to="/" style={{textDecoration: 'none'}}>Home Link</Link> */

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="logoWrapper">
                <img src={FeedMe} alt='feedme' id="feedmelogo" onClick={() => {navigate('/')}}/>
            </div>
            <div className="navbuttonList">
                <button className="navbutton" onClick={() => {navigate('/')}}>
                    Home
                </button>
                <button className="navbutton" onClick={() => {navigate('/recipe')}}>
                    Recipes
                </button>
                <button className="navbutton" onClick={() => {navigate('/')}}>
                    Forum
                </button>
                <button className="navbutton" onClick={() => {navigate('/myfridge')}}>
                    My Fridge
                </button>
            </div>
            <div className="nav-user">
                <div className="nav-fav">
                    <AiOutlineStar id="favIcon"/>
                    <AiFillStar id="favIconHover"/>
                </div>
                <div className="nav-user-icon">
                    <BiUserCircle id="userIcon" onClick={() => {navigate('/Login')}}/>
                </div>
            </div>
        </div>
    )
}

export default Header;