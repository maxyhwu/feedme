import React, {useState, useEffect} from 'react';
import './ResetPasswordPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { FormattedMessage } from "react-intl";
import {UseLoginContext} from '../Context/LoginCnt'
import { UseLangContext } from '../Context/LangCnt';
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";
import { useDispatch } from "react-redux";



const initialState = {
    password: "",
    password2: "",
};


const ResetPasswordPage = () => {
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
    const { password, password2 } = formData;

    const { resetToken } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };
    // useEffect(()=>{console.log(lang)}, [lang])
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


    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    const handleSubmit = () => {
        changeLogin(true)
        navigate('/mypage')
    }
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
                
                <form onSubmit={reset} id="info">
                <div id="header">
                    <h2 className="infos" style={{margin:"5px"}}>Reset Your Password</h2>
                </div>
                    <input
                        type="password"
                        className="input infos" 
                        placeholder="Password"
                        // autoComplete={checkbox?'current-password':'off'}
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
                    <button type="submit" className="infos" id="signup">
                        Reset
                    </button>
                    {/* <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="login.or" defaultMessage="or" /></div>
                        <div id="line"></div>
                    </div> */}
                </form>
                {/* <span style={{display:"flex", justifyContent:"center", marginTop:"5px"}}>
                    <p style={{fontSize:"14px"}}> &nbsp; &nbsp; &nbsp; Already have an account? &nbsp; &nbsp; &nbsp;</p>
                    <Link style={{fontSize:"13px"}} to = "/login">Log in</Link>
                </span> */}
                
            </div>
        </div>
    )
}

export default ResetPasswordPage;
