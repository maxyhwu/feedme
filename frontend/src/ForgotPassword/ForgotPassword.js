import React, { useState } from "react";
import './ForgotPassword.css';
import FeedMe from '../assets/FeedMe.jpg';
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../services/authService";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const forgot = async (e) => {
        e.preventDefault();
        if (!email) {
          return toast.error("Please enter an email");
        }
    
        if (!validateEmail(email)) {
          return toast.error("Please enter a valid email");
        }
    
        const userData = {
          email,
        };
    
        await forgotPassword(userData);
        setEmail("");
    };


    return (
        <div className="container">
            <div id='logo'>
                <img src={FeedMe} alt='feedme' id="feedmelogo"/>
            </div>
            <div className="body">
                
                <form id="info">
                <div id="header">
                    <h2 className="infos" id="title">Forget Password</h2>
                </div>
                <input type="text" placeholder='Email' className="input infos" autoComplete='off'/>
                <button type="submit" className="infos" id="reset">
                    Sent Reset Email
                </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;
