import React, { useState } from "react";
import './ForgotPassword.css';
import FeedMe from '../assets/FeedMe.jpg';
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";


const initialState = {
    password: "",
    password2: "",
};

const ForgotPassword = () => {
    const [formData, setformData] = useState(initialState);
    const { password, password2 } = formData;

    const { resetToken } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const reset = async (e) => {
        e.preventDefault();
    
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }
    
        const userData = {
            password,
            password2,
        };
    
        try {
            const data = await resetPassword(userData, resetToken);
            toast.success(data.message);
        } catch (error) {
            console.log(error.message);
        }
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
