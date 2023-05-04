import "./Header.css";
import { useNavigate } from "react-router-dom";
import FeedMe from '../assets/FeedMe.jpg';
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { UseLoginContext } from "../Context/LoginCnt";
import { UseLangContext } from "../Context/LangCnt";
import AccountMenu from "../Components/menu";
import GoogleTranslate from "./Translator";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    const navigate = useNavigate();
    const {lang,changeLang} = UseLangContext()
    const {login} = UseLoginContext()

    const handleSelectChange = (evt) => {
        changeLang(evt.target.value);
    }


    const handleUserIcon = () => {
        navigate('/Login');
    }

    return (
        <Navbar expand="lg">
            {/* <GoogleTranslate /> */}
            <Container>
                {/* LOGO */}
                <Navbar.Brand>
                    <div className="logoWrapper">
                        <img src={FeedMe} alt='feedme' id="feedmelogo" onClick={() => {navigate('/')}}/>
                    </div>
                </Navbar.Brand>

                {/* Language selector and user icon when screen is xs/sm/md */}
                <div className="ms-auto d-flex d-lg-none">
                    {/* <div>
                        <select
                            value={lang}
                            onChange={(evt) => {
                                handleSelectChange(evt);
                            }}
                            id="selecter"
                        >
                            <option value="en">English</option>
                            <option value="cn">中文</option>
                        </select>
                    </div> */}
                    {/* <GoogleTranslate /> */}

                    <div className="nav-user">
                        <div className="nav-user-icon">
                            {login ? <AccountMenu/> : <BiUserCircle id="userIcon" onClick={() => {handleUserIcon()}}/>}
                        </div>
                    </div>
                </div>

                {/* Use toggle list when screen is xs/sm/md */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar content */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navbuttonList">
                        <Nav.Link className="navbutton" onClick={() => {navigate('/')}}>Home</Nav.Link>

                        <NavDropdown title="Recipes" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => {navigate('/recipe')}}>All Recipes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate('/recipe')}}>Suggest For You</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate('/recipe')}}>My Recipes</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate('/myArchive')}}>Saved Recipes</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link onClick={() => {navigate('/myfridge')}}>My Fridge</Nav.Link>

                        {/* Language selector and user icon when expanded */}
                        <div className="ms-auto d-none d-lg-flex">
                            {/* <div>
                                <select
                                    value={lang}
                                    onChange={(evt) => {
                                        handleSelectChange(evt);
                                    }}
                                    id="selecter"
                                >
                                    <option value="en">English</option>
                                    <option value="cn">中文</option>
                                </select>
                            </div> */}
                            <GoogleTranslate />
                            <div className="nav-user">
                                <div className="nav-user-icon">
                                    {login ? <AccountMenu/> : <BiUserCircle id="userIcon" onClick={() => {handleUserIcon()}}/>}
                                </div>
                            </div>
                        </div>
                    </Nav>                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;