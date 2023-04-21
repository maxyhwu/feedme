import React, {useState, useEffect} from 'react';
import './RegisterPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { FormattedMessage } from "react-intl";
import {UseLoginContext} from '../Context/LoginCnt'
import { UseLangContext } from '../Context/LangCnt';
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};


const RegisterPage = () => {
    const redirect_uri = process.env?.REACT_APP_GOOGLE_OAUTH_REDIRECT
    const clientID = process.env?.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    const redirect_login = process.env?.REACT_APP_TWITTER_REDIRECT_LOGIN
    const request_token = process.env?.REACT_APP_TWITTER_REQUEST_URL
    const location = useLocation();
    const [checkbox, setCheckbox] = useState(false);
    let from = ((location.state)?.from?.pathname) || '/';
    const navigate = useNavigate();
    const {changeLogin} = UseLoginContext();
    // const {lang} = UseLangContext();
    const [formData, setformData] = useState(initialState);
    const { name, email, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };
    // useEffect(()=>{console.log(lang)}, [lang])


    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    const handleSubmit = () => {
        changeLogin(true)
        navigate('/mypage')
    }

    const onSuccess = (response) => {
        // window.close()
        navigate('/')
        window.location.reload(true)
        const token = response.headers.get('x-auth-token');
        console.log('token')
        response.json().then(user => {
          if (token) {
            console.log(user)
          }
        });
      };

    const onFailed = (error) => {
        alert(error);
    };

    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        // if (!validateEmail(email)) {
        //     return toast.error("Please enter a valid email");
        // }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            name,
            email,
            password,
        };
    };

    return (
        <div className="container">
            <div className="body">
                <div id='logo'>
                    <img src={FeedMe} alt='feedme' id="feedmelogo"/>
                </div>
                <form id="info" onSubmit={register}>
                    <div id="header">
                        <div className="infos" id="register"><FormattedMessage id="register.register" defaultMessage="Register" /></div>
                    </div>
                    <FormattedMessage id="register.name" defaultMessage="Username" >
                        {(msg) => (<input 
                                                type="text" 
                                                placeholder={msg} 
                                                className="input infos" 
                                                // autoComplete={checkbox?'email':'off'} 
                                                value = {name} 
                                                onchange = {handleInputChange}
                                            />)}
                    </FormattedMessage>
                    <FormattedMessage id="register.email" defaultMessage="Email ID" >
                        {(msg) => (<input 
                                                type="text" 
                                                placeholder={msg} 
                                                className="input infos" 
                                                autoComplete={checkbox?'email':'off'} 
                                                value = {email} 
                                                onchange = {handleInputChange}
                                            />)}
                    </FormattedMessage>
                    <FormattedMessage id="register.password1" defaultMessage="Password" >
                        {(msg) => (<input 
                                                type="password" 
                                                placeholder={msg} 
                                                className="input infos" 
                                                autoComplete={checkbox?'current-password':'off'}
                                                value = {password}
                                                onChange = {handleInputChange}
                                            />)}
                    </FormattedMessage>
                    <FormattedMessage id="register.password2" defaultMessage="Confirm Password" >
                        {(msg) => (<input 
                                                type="password" 
                                                placeholder={msg} 
                                                className="input infos" 
                                                autoComplete={checkbox?'current-password':'off'}
                                                value = {password2}
                                                onChange = {handleInputChange}
                                            />)}
                    </FormattedMessage>
                    <div id="external" className="infos">
                        <Link 
                            href={getGoogleUrl(from, redirect_uri, clientID)}
                            id="google-icon"
                        >
                            <GoogleLogo  id="googlelogo"/>    
                        </Link> 
                        <TwitterLogin loginUrl={redirect_login}
                            onFailure={onFailed} onSuccess={onSuccess}
                            requestTokenUrl={request_token}
                            className="twitter-button"
                            >
                                <img src={twitterLogo} alt="Twitter Logo" />
                            </TwitterLogin>
                    </div>
                    <FormattedMessage id="signup.signup" defaultMessage="Sign up" >
                        {(msg) => (<input type="submit" value={msg} className="infos" id="signup" onSubmit = {handleSubmit}/>)}
                    </FormattedMessage>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="register.or" defaultMessage="or" /></div>
                        <div id="line"></div>
                    </div>
                    <FormattedMessage id="register.login" defaultMessage="Log in" >
                        {(msg) => (<input type="submit" value={msg} className="infos" id="login" onSubmit={navigate('/login')}/>)}
                    </FormattedMessage>
                    
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
