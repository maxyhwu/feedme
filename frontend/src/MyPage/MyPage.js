import React from 'react'
import FeedMe from '../assets/FeedMe.jpg';
import './MyPage.css';
import { FaSignOutAlt, FaAngleRight, FaUserCog, FaRegStar, FaEye, FaBell, FaHeadset } from "react-icons/fa";

export const MyPage = () => {
  return (
    <div className='main'>
        <section className='left-section'>
            <div className='user-info-container'>
                {/* <h1>This is mypage</h1> */}
                <div className="user-pic-container">
                    <img className='user-pic' src={FeedMe} alt='user-pic'/>
                </div>
                <div className="user-name-container">
                    IM Fridge
                </div>
                <div className="logout-btn">
                    <FaSignOutAlt/>
                </div>
            </div>
            
        </section>
        <section className='right-section'>
            <section className='setting-bar-container'>
                <div className='setting-bar'>
                    <div className="setting-bar-icon" id='edit-profile'>
                        <FaUserCog/>
                    </div>
                    <div className="setting-bar-text">
                        Edit Profile
                    </div>
                    <div className="setting-bar-expand">
                        <FaAngleRight/>
                    </div>
                </div>
                <div className='setting-bar'>
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
                <div className='setting-bar'>
                    <div className="setting-bar-icon" id='view-history'>
                        <FaEye/>
                    </div>
                    <div className="setting-bar-text">
                        View History
                    </div>
                    <div className="setting-bar-expand">
                        <FaAngleRight/>
                    </div>
                </div>
                <div className='setting-bar'>
                    <div className="setting-bar-icon" id='notification'>
                        <FaBell/>
                    </div>
                    <div className="setting-bar-text">
                        Notification
                    </div>
                    <div className="setting-bar-expand">
                        <FaAngleRight/>
                    </div>
                </div>
                <div className='setting-bar'>
                    <div className="setting-bar-icon" id='help-center'>
                        <FaHeadset/>
                    </div>
                    <div className="setting-bar-text">
                        Help Center
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
