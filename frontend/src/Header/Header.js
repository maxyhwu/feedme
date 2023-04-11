import "./Header.css";
import { useNavigate } from "react-router-dom";
import FeedMe from '../assets/FeedMe.jpg';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { UseLoginContext } from "../Context/LoginCnt";
import { UseLangContext } from "../Context/LangCnt";
import AccountMenu from "../Components/menu";

const Header = () => {
    const navigate = useNavigate();
    const {lang,changeLang} = UseLangContext()
    const {login} = UseLoginContext()


    const handleUserIcon = () => {
        navigate('/Login');
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
            <div>
                <select
                    value={lang}
                    onChange={(evt) => {
                        changeLang(evt.target.value);
                    }}
                    id="selecter"
                    >
                    <option value="en">English</option>
                    <option value="cn">中文</option>
                </select>
            </div>
            <div className="nav-user">
                <div className="nav-fav">
                    <AiOutlineStar id="favIcon"/>
                    <AiFillStar id="favIconHover" onClick={() => {navigate('myArchive')}}/>
                </div>
                <div className="nav-user-icon">
                    {login? <AccountMenu/>:<BiUserCircle id="userIcon" onClick={() => {handleUserIcon()}}/>}
                </div>
            </div>
        </div>
    )
}

export default Header;