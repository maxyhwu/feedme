import "./Header.css";
import { useNavigate } from "react-router-dom";
import FeedMe from '../assets/FeedMe.jpg';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const Header = ({isLoggedIn}) => {
    const navigate = useNavigate();

    const handleUserIcon = () => {
        if(!isLoggedIn) {
            navigate('/Login');
        } else {
            navigate('/startup');
        }
    }

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
                <button className="navbutton" onClick={() => {}}>
                    Forum
                </button>
                <button className="navbutton" onClick={() => {navigate('/myfridge')}}>
                    My Fridge
                </button>
            </div>
            <div className="nav-user">
                <div className="nav-fav">
                    <AiOutlineStar id="favIcon"/>
                    <AiFillStar id="favIconHover" onClick={() => {navigate('myArchive')}}/>
                </div>
                <div className="nav-user-icon">
                    <BiUserCircle id="userIcon" onClick={() => {handleUserIcon()}}/>
                </div>
            </div>
        </div>
    )
}

export default Header;