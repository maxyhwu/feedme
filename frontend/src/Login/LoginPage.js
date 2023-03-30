import React, {useState, useEffect} from 'react';
import './LoginPage.css';
import FeedMe from '../assets/FeedMe.jpg';
import twitterLogo from '../assets/twitterLogo.png';
import TwitterLogin from 'react-twitter-auth';
import {
    Link,
    useLocation
  } from "react-router-dom";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import { getGoogleUrl } from '../utils/getGoogleUrl';
import { onSuccess, onFailed } from '../utils/getTwittertoken';
import { FormattedMessage, IntlProvider } from "react-intl";

export default function LoginPage () {

    const redirect_uri = process.env?.REACT_APP_GOOGLE_OAUTH_REDIRECT
    const clientID = process.env?.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
    const redirect_login = process.env?.REACT_APP_TWITTER_REDIRECT_LOGIN
    const request_token = process.env?.REACT_APP_TWITTER_REQUEST_URL
    const location = useLocation();
    const [checkbox, setCheckbox] = useState(false);
    let from = ((location.state)?.from?.pathname) || '/';
    const [lang, setLang] = useState('en')
    const [locale, setLocale] = useState(undefined)

    useEffect(() => {
        async function fetchLang () {
            try {
                const resp = await fetch(`./lang/${lang}.json`)
                const data = await resp.json()
                console.log(data)
                setLocale(data)
              } catch (error) {
                console.error(`Error fetching translation file for ${lang}:`, error)
              }
        }
        fetchLang()
      },[lang])

    const handleClickCheckbox = () => {
        setCheckbox(!checkbox)
    }

    return (
        <IntlProvider locale="en" messages={locale}>
        <div className="container">
            <div className="body">
                <div id='logo'>
                    <img src={FeedMe} alt='feedme' id="feedmelogo"/>
                </div>
                <form id="info">
                    <div id="header">
                        <div className="infos" id="welcome"><FormattedMessage id="login.welcome" defaultMessage="Welcome" /></div>
                        <select
                            value={lang}
                            onChange={(evt) => {
                                setLang(evt.target.value);
                            }}
                            id="selecter"
                            >
                            <option value="en">English</option>
                            <option value="cn">中文</option>
                        </select>
                    </div>
                    <FormattedMessage id="login.email" defaultMessage="Email ID" >
                        {(msg) => (<input type="text" placeholder={msg} className="input infos" autoComplete={checkbox?'email':'off'}/>)}
                    </FormattedMessage>
                    <FormattedMessage id="login.password" defaultMessage="Password" >
                        {(msg) => (<input type="password" placeholder={msg} className="input infos" autoComplete={checkbox?'current-password':'off'}/>)}
                    </FormattedMessage>
                    <div id="passwordCtrl" className="infos">
                        <input type="checkbox" id="checkbox" className="checkbox-round" checked={checkbox} onChange={handleClickCheckbox}/>
                        <label htmlFor="remember" onClick={handleClickCheckbox}><FormattedMessage id="login.rememberMe" defaultMessage="Remember me" /></label>
                        <Link to="/setpassword" id="setpsw"><FormattedMessage id="login.forget" defaultMessage="forget password" />?</Link>
                    </div>
                    <FormattedMessage id="login.login" defaultMessage="Log in" >
                        {(msg) => (<input type="submit" value={msg} className="infos" id="login"/>)}
                    </FormattedMessage>
                    <div id='dashLine' className="infos">
                        <div id="line"></div>
                        <div id="text"><FormattedMessage id="login.or" defaultMessage="or" /></div>
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
        </IntlProvider>
    )
}