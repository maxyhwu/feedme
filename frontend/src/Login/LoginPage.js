import React, {useState, useEffect, useRef} from 'react';
import './LoginPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { FormattedMessage } from "react-intl";
import { UseLoginContext } from '../Context/LoginCnt';
import {Link as MuiLink} from '@mui/material';
import { toast } from 'react-toastify';
import { apiLogin } from '../axios/noToken';
import { UseDataContext } from '../Context/useUserData';
import { UseEnvContext } from '../Context/envCxt';

export default function LoginPage () {
    const {env} = UseEnvContext();
    // const redirect_uri = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT
    // const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    // const redirect_login = process.env.REACT_APP_TWITTER_REDIRECT_LOGIN
    // const request_token = process.env.REACT_APP_TWITTER_REQUEST_URL
    const redirect_uri = env?.google.redirect_login
    const clientID = env?.google.clientID
    const redirect_login = env?.twitter.redirect_login
    const request_token = env?.twitter.request_url
    const location = useLocation();
    const [checkbox, setCheckbox] = useState(false);
    let from = ((location.state)?.from?.pathname) || '/';
    const navigate = useNavigate()
    const {changeLogin} = UseLoginContext();
    const [success, setSuccess] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [passworderror, setPassworderError] = useState(false);
    const [click, setClick] = useState();
    const [userData, setUserData] = useState();
    const [password, setPassword] = useState();
    const {changeData} = UseDataContext();
    const formRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    useEffect ( () => {
        if (success) {
            toast.success('登入成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            navigate('/')
            // window.location.reload(true)
        }
        if (notfound) {
            toast.info('尚未註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (passworderror) {
            toast.warning('密碼有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-warning'
            })}
    }, [notfound, success, passworderror, click, navigate,changeLogin,])

    const setAlert = (succ, notf, pass) => {
        setSuccess(succ)
        setNotFound(notf)
        setPassworderError(pass)
    }

    async function loginUser(credentials) {
        return apiLogin(credentials)
        .then(response=> {
            if (response.status === 200) {
                const token = response.headers.get('x-auth-token');
                return [response.data, token]
            }
        })
        .then(function(response) {
            const [data, token] = response
            console.log('success')
            changeData({userName: data.userName, email: data.email, token: token, fridge: data.fridge, favorite: data.favorite, notiRec: data.notiRec, notiIngre: data.notiIngre})
            changeLogin(true)
            setAlert(true, false, false)
        })
        .catch((reason) => {
            let response = reason.response
            if (response.status === 400) {
                if (response.data.message === 'Password incorrect'){
                    setAlert(false, false, true)
                } else if (response.data.message === 'User name not found'){
                    setAlert(false, true, false)
                }
            }
        })
    }

    const handleLogin = async e => {
        e.preventDefault()
        await loginUser({
            userData: userData,
            password
        });
        
        setClick(!click)
    }

    const setTwitterAlert = (succ, notf) => {
        setSuccess(succ)
        setNotFound(notf)
    }

    const onSuccess = (response) => {
        // window.close()
        // navigate('/')
        // window.location.reload(true)
        const token = response.headers.get('x-auth-token');
        response.json().then(user => {
            if (token) {
                changeData({userName: user.userName, email: user.email, token: token, fridge: user.fridge, favorite: user.favorite})
                changeLogin(true)
                setTwitterAlert(true, false)
            } else {
                if (user.message === 'User not register'){
                    setTwitterAlert(false, true)
                } 
            }
        });
    };

    const onFailed = (error) => {
        alert(error);
    };

    const checkValid = () => {
        if (emailRef.current.value === ''){
            emailRef.current.setCustomValidity("Email can not be empty."); 
        } else {
            emailRef.current.setCustomValidity("")
        }
        if (passwordRef.current.value === ''){
            passwordRef.current.setCustomValidity("Password can not be empty.");
        } else {
            passwordRef.current.setCustomValidity("")
        }
    }

    return (
        <div className="container">
            <div id='logo'>
                <img src={FeedMe} alt='feedme' id="feedmelogo"/>
            </div>
            <div className="body">
                <form id="info" ref={formRef} onSubmit={handleLogin}>
                    <div id="header">
                        <h2 className="infos" style={{margin:"3px"}}>Welcome back!</h2>
                    </div>
                    <FormattedMessage id="login.email" defaultMessage="Email or User Name" >
                        {(msg) => (<input type="text" ref={emailRef} placeholder={msg} className="input infos" autoComplete={checkbox?'email':'off'} onChange={e=>setUserData(e.target.value)} />)}
                    </FormattedMessage>
                    <FormattedMessage id="login.password" defaultMessage="Password" >
                        {(msg) => (<input type="password" ref={passwordRef} placeholder={msg} className="input infos" autoComplete={checkbox?'current-password':'off'} onChange={e=>setPassword(e.target.value)}/>)}
                    </FormattedMessage>
                    <div id="passwordCtrl" className="infos">
                        <input type="checkbox" id="checkbox" className="checkbox-round" checked={checkbox} onChange={handleClickCheckbox}/>
                        <label htmlFor="remember" onClick={handleClickCheckbox}><FormattedMessage id="login.rememberMe" defaultMessage="Remember me" /></label>
                        <Link to="/setpassword" id="setpsw"><FormattedMessage id="login.forget" defaultMessage="forget password" />?</Link>
                    </div>
                    <FormattedMessage id="login.login" defaultMessage="Log in" >
                        {(msg) => (<input type="submit" value={msg} className="infos" id="login" onClick={checkValid}/>)} 
                    </FormattedMessage>
                    <div id="external" className="infos">
                        <MuiLink
                            href={getGoogleUrl(from, redirect_uri, clientID)}
                            id="google-icon"
                        >
                            <GoogleLogo  id="googlelogo"/>    
                        </MuiLink> 
                        <TwitterLogin loginUrl={redirect_login}
                            onFailure={onFailed} onSuccess={onSuccess}
                            requestTokenUrl={request_token}
                            className="twitter-button"
                            >
                                <img src={twitterLogo} alt="Twitter Logo" />
                            </TwitterLogin>
                    </div>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="login.or" defaultMessage="or" /></div>
                        <div id="line"></div>
                    </div>
                </form>
                <span style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
                    <p style={{fontSize:"14px"}}> &nbsp; &nbsp; &nbsp; Don't have an account?  &nbsp; &nbsp; &nbsp;</p>
                    <Link style={{fontSize:"13px"}} to = "/register">Sign up</Link>
                </span>
            </div>
        </div>
    )
}