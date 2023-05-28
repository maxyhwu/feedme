import React from 'react'
import FeedMe from '../assets/FeedMe.jpg';
import './MyPage.css';
import { FaSignOutAlt, FaAngleRight, FaUserCog, FaRegStar, FaHeadset } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const MyPage = () => {

    const navigate = useNavigate();
    const handleSetting = () => {
        navigate('/settings')
    };
    const handleClickingMyArchive = () => {
        navigate('/myArchive')
    };
    const handleClickingHelpCenter = () => {
        navigate('/contactus')
    };

    return (
        <div className='main-mypage'>
            <section className='left-section'>
                <div className='user-info-container'>
                    <div className="user-middle-container">
                        <div className="user-pic-container">
                            <img className='user-pic' src={FeedMe} alt='user-pic'/>
                        </div>
                        <div className="user-name-container">
                            IM Fridge
                        </div>
                        <div>
                            <Link to="/edit-profile">
                                <button className="--btn --btn-primary">Edit Profile</button>
                            </Link>
                        </div>
                        <div className="logout-btn">
                            <div className="logout-text">
                                Log Out
                            </div>
                            <FaSignOutAlt/>
                        </div>
                    </div>
                </div>
                
            </section>
            <section className='right-section'>
                <section className='setting-bar-container'>
                    <div className='setting-bar' onClick={handleSetting}>
                        <div className="setting-bar-icon" id='edit-profile'>
                            <FaUserCog/>
                        </div>
                        <div className="setting-bar-text">
                            Setting
                        </div>
                        <div className="setting-bar-expand">
                            <FaAngleRight/>
                        </div>
                    </div>
                    <div className='setting-bar' onClick={handleClickingMyArchive}>
                        <div className="setting-bar-icon" id='archive'>
                            <FaRegStar/>
                        </div>
                        <div className="setting-bar-text">
                            My Archive
                        </div>
                        <div className="setting-bar-expand">
                            <FaAngleRight/>
                        </div>
                    </div>
                    <div className='setting-bar' onClick={handleClickingHelpCenter}>
                        <div className="setting-bar-icon" id='contact us'>
                            <FaHeadset/>
                        </div>
                        <div className="setting-bar-text">
                            Contact Us
                        </div>
                        <div className="setting-bar-expand">
                            <FaAngleRight/>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
export default MyPage;