import React, {useState} from 'react';
import './SignupPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import {
    Link,
    useLocation
  } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';

export default function SignupPage () {

    const redirect_uri = process.env?.REACT_APP_GOOGLE_OAUTH_REDIRECT
    const clientID = process.env?.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    const redirect_login = process.env?.REACT_APP_TWITTER_REDIRECT_LOGIN
    const request_token = process.env?.REACT_APP_TWITTER_REQUEST_URL
    const location = useLocation();
    const [checkbox, setCheckbox] = useState(false);
    let from = ((location.state)?.from?.pathname) || '/';

    const onSuccess = (response) => {
        // window.close()
        const token = response.headers.get('x-auth-token');
        // console.log('token')
        response.json().then(user => {
          if (token) {
            // console.log(user)
          }
        });
      };

      const onFailed = (error) => {
        alert(error);
    };

    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    return (
        <div className="container">
            <div className="body">
                <div id='logo'>
                    <img src={FeedMe} alt='feedme' id="feedmelogo"/>
                </div>
                <form id="info">
                    <div className="infos" id="welcome">Signup</div>
                    <input type="text" placeholder='Email ID' className="input infos" autoComplete={checkbox?'email':'off'}/>
                    <input type="password" placeholder='Password' className="input infos" autoComplete={checkbox?'current-password':'off'}/>
                    <div id="passwordCtrl" className="infos">
                        <input type="checkbox" id="checkbox" className="checkbox-round" checked={checkbox} onChange={handleClickCheckbox}/>
                        <label htmlFor="remember" onClick={handleClickCheckbox}>Remember me</label>
                    </div>
                    <input type="submit" value="Login" className="infos" id="login"/>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text">or</div>
                        <div id="line"></div>
                    </div>
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
                </form>
            </div>
        </div>
    )
}