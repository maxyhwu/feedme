import React from 'react';
import './SetPassword.css';
import FeedMe from '../assets/FeedMe.jpg';

export default function SetLogin () {



    return (
        <div className="container">
            <div className="body">
                <div id='logo'>
                    <img src={FeedMe} alt='feedme' id="feedmelogo"/>
                </div>
                <form id="info">
                <div className="infos" id="title">Reset Password</div>
                    <input type="text" placeholder='Phone Number' className="input infos" autoComplete='off'/>
                    <div className="d-flex" >
                        <input type="text" placeholder='Verify Code' className="input infos mr-auto p-2" id="code" autoComplete='off'/>
                        <button id="send" className="p-2" type="button">Get Verification Code</button>
                    </div>
                    <input type="password" placeholder='New Password' className="input infos" autoComplete='off'/>
                    <input type="submit" value="Reset" className="infos" id="reset"/>
                </form>
            </div>
        </div>
    )
}