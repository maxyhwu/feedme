import React, {useState, useEffect} from 'react';
import './RegisterPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { validateEmail } from "../services/authService";
import { apiSignUp } from '../axios/noToken';
import {Link as MuiLink} from '@mui/material';
import { UseEnvContext } from '../Context/envCxt';

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};


const RegisterPage = () => {
    const {env} = UseEnvContext()
    // const redirect_uri = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_SIGNUP
    // const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    // const redirect_login = process.env.REACT_APP_TWITTER_REDIRECT_SIGNUP
    // const request_token = process.env.REACT_APP_TWITTER_REQUEST_URL
    const redirect_uri = env?.google.redirect_signup
    const clientID = env?.google.clientID
    const redirect_signup = env?.twitter.redirect_signup
    const request_token = env?.twitter.request_url
    const location = useLocation();
    let from = ((location.state)?.from?.pathname) || '/';
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [hassignup, setHasSignUp] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [click, setClick] = useState(false);
    const [emailinValid, setEmailinValid] = useState(false);

    const [formData, setformData] = useState(initialState);
    const { name, email, password, password2 } = formData;

    useEffect ( () => {
        if (success) {
            toast.success('註冊成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            navigate('/login')
        }
        if (hassignup) {
            toast.info('此信箱已註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })
            // window.location.reload(true)
        }
        if (incorrect) {
            toast.error('資料有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-error'
            })}
        if (emailinValid) {
            toast.info('Email有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [success, hassignup, incorrect, click, emailinValid, navigate])
    
    const setAlert = (hassign, incorr, succ, invalid) => {
        setHasSignUp(hassign)
        setIncorrect(incorr)
        setSuccess(succ)
        setEmailinValid(invalid)
    }

    const setTwitterAlert = (hassign, succ) => {
        setHasSignUp(hassign)
        setSuccess(succ)
    }

    async function signupUser(credentials) {
        return apiSignUp(credentials)
        .then(function(response) {
            if (response.status === 200) {
                setAlert(false, false, true, false)
            }
         })
         .catch((reason) => {
            let response = reason.response
            if (response.status === 400){
                if ( response.data.message === "Details are not correct") {
                    setAlert(false, true, false, false)
                } else if (response.data.message === 'user already exists') {
                    setAlert(true, false, false, false)
                } else if (response.data.message === 'Please provide a valid email address.') {
                    setAlert(false, false, false, true)
                }
            }
         })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };
    // useEffect(()=>{console.log(lang)}, [lang])
    const onSuccess = (response) => {
        if (response.status === 200) {
            setTwitterAlert(false, true)
        } else if (response.status === 401){
            response.json().then( (response) => {
                // console.log(response)
                // console.log(response.message)
                if (response.message === 'User exist.') {
                    setTwitterAlert(true, false)
                }
                
                setClick(!click)
                // window.location.reload(true)
            })
        }
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
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        const userData = {
            userName: name,
            email,
            password,
        };
        await signupUser(userData);
        setClick(!click)
    };

    return (
        <div className="container">
            <div id='logo'>
                <img src={FeedMe} alt='feedme' id="feedmelogo"/>
            </div>
            <div className="body">
                
                <form onSubmit={register} id="info">
                <div id="header">
                    <h2 className="infos" style={{margin:"5px"}}>Welcome, newbie!</h2>
                </div>
                    <input
                        type="text"
                        className="input infos" 
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        className="input infos" 
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="input infos" 
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="input infos" 
                        placeholder="Confirm Password"
                        required
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                    />
                    <div id="external" className="infos">
                        <MuiLink 
                            href={getGoogleUrl(from, redirect_uri, clientID)}
                            id="google-icon"
                        >
                            <GoogleLogo  id="googlelogo"/>    
                        </MuiLink> 
                        <TwitterLogin loginUrl={redirect_signup}
                            onFailure={onFailed} onSuccess={onSuccess}
                            requestTokenUrl={request_token}
                            className="twitter-button"
                            >
                                <img src={twitterLogo} alt="Twitter Logo" />
                        </TwitterLogin>
                    </div>
                    <button type="submit" className="infos" id="signup">
                        Sign up
                    </button>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="login.or" defaultMessage="or" /></div>
                        <div id="line"></div>
                    </div>
                </form>
                <span style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
                    <p style={{fontSize:"14px"}}> &nbsp; &nbsp; &nbsp; Already have an account? &nbsp; &nbsp; &nbsp;</p>
                    <Link style={{fontSize:"13px"}} to = "/login">Log in</Link>
                </span>
                
            </div>
        </div>
    )
}

export default RegisterPage;
