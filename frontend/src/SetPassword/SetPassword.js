import React, { useState, useRef, useEffect } from "react";
import './SetPassword.css';
import FeedMe from '../assets/FeedMe.jpg';
import { toast } from "react-toastify";
import { apiSetPW, apiForgetPW } from "../axios/noToken";
import { useNavigate } from "react-router-dom";


const SetLogin = () => {

    const [succReset, setSuccReset] = useState(false);
    const [inValid, setInValid] = useState(false);
    const [succSend, setSuccSend] = useState(false);
    const [emailInValid, setEmailInValid] = useState(false);
    const [emailNotExist, setEmailNotExist] = useState(false);
    const [sendEmailError, setSendEmailError] = useState(false);
    const [token, setToken] = useState('')
    const [click, setClick] = useState(false);
    const [sendClick, setSendClick] = useState(false);
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const formRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate();

    useEffect ( () => {
        if (succReset) {
            toast.success('密碼修改成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            navigate('/login')
        }
        if (inValid) {
            toast.info('驗證失敗 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [succReset, inValid, click, navigate])

    useEffect ( () => {
        if (succSend) {
            toast.success('驗證碼已送出 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
        }
        if (emailInValid) {
            toast.info('信箱不存在 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (emailNotExist) {
            toast.info('信箱未註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (sendEmailError) {
            toast.info('傳送失敗 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [succSend, emailInValid, emailNotExist, sendEmailError, sendClick, navigate])

    const setAlert = (succ, valid) => {
        setSuccReset(succ)
        setInValid(valid)
    }

    const setCodeAlert = (succ, emailInValid, emailNotExist, sendEmailError) => {
        setSuccSend(succ)
        setEmailInValid(emailInValid)
        setEmailNotExist(emailNotExist)
        setSendEmailError(sendEmailError)
    }

    async function getVerifyCode(credentials) {
        return apiForgetPW(credentials)
        .then(response=> {
            if (response.status === 200) {
                setCodeAlert(true, false, false, false)
            }
        })
        .catch((reason) => {
            let response = reason.response
            if (response.status === 400) {
                // console.log("message: ",response.data.message === 'Email not exists.')
                if (response.data.message === 'Email not exists.'){
                    setCodeAlert(false, false, true, false)
                } else if (response.data.messege === 'Send email error.'){
                    setCodeAlert(false, false, false, true)
                }
            }
        })
    }

    async function setPassword(credentials) {
        return apiSetPW(credentials)
        .then(response=> {
            if (response.status === 200) {
                setAlert(true, false)
            }
        })
        .catch((reason) => {
            let response = reason.response
            if (response.status === 400) {
                if (response.data.messege === "Invalid"){
                    setAlert(false, true)
                }
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await setPassword({token, email, password: newPassword})
        setClick(!click)
    }

    const sendCode = async e => {
        e.preventDefault()
        await getVerifyCode({email})
        setSendClick(!sendClick)
    }

    const checkEmailValid = () => {
        if (emailRef.current.value === ''){
            emailRef.current.setCustomValidity("Email can not be empty."); 
        } else {
            emailRef.current.setCustomValidity("")
        }
    }

    const checkValid = () => {
        if (emailRef.current.value === ''){
            emailRef.current.setCustomValidity("Email can not be empty."); 
        } else {
            emailRef.current.setCustomValidity("")
        }
        if (passwordRef.current.value === ''){
            passwordRef.current.setCustomValidity("Password can not be empty."); 
        } else if (passwordRef.current.value.length < 6){
            passwordRef.current.setCustomValidity("Passwords must be up to 6 characters."); 
        } else {
            passwordRef.current.setCustomValidity("")
        }
    }

    return (
        <div className="container2">
            <div id='logo'>
                <img src={FeedMe} alt='feedme' id="feedmelogo2"/>
            </div>
            <div className="body">
                
                <form id="info" ref={formRef} onSubmit={handleSubmit}>
                <div id="header">
                    <h2 className="infos" id="title">Forgot Password</h2>
                </div>

                    <input type="text" placeholder='Email' className="input infos" autoComplete='off' onChange={e=>setEmail(e.target.value)}/>
                    <div className="d-flex" >
                        <input type="text" placeholder='Code' className="input infos mr-auto p-2" id="code" autoComplete='off' onChange={e=>setToken(e.target.value)}/>
                        <button id="send" className="infos" type="button" onClick={e=>{checkEmailValid();sendCode(e)}} ref={emailRef}>Get Verification Code</button>
                    </div>
                    <input type="password" placeholder='New Password' className="input infos" ref={passwordRef} onChange={e=>setNewPassword(e.target.value)}/>
                    <button type="submit" className="infos" id="reset" onClick={e=>checkValid(e)}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SetLogin;
