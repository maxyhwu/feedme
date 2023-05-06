import React, { useState, useRef, useEffect } from "react";
import './SetPassword.css';
import FeedMe from '../assets/FeedMe.jpg';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";
import { apiSetPW, apiForgetPW } from "../axios/noToken";


const initialState = {
    password: "",
    password2: "",
};

const SetLogin = () => {
    const [formData, setformData] = useState(initialState);
    const { password, password2 } = formData;

    const [succReset, setSuccReset] = useState(false);
    const [inValid, setInValid] = useState(false);
    const [succSend, setSuccSend] = useState(false);
    const [emailInValid, setEmailInValid] = useState(false);
    const [emailNotExist, setEmailNotExist] = useState(false);
    const [sendEmailError, setSendEmailError] = useState(false);
    const [code, setCode] = useState('')
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
            toast.success('密碼修改成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            navigate('/login')
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
            console.log(response)
            if (response.status === 200) {
                setCodeAlert(true, false, false, false)
            }
        })
        .catch((reason) => {
            let response = reason.response
            if (response.status === 400) {
                if (response.data.message === 'Please provide a valid email address.'){
                    setCodeAlert(false, true, false, false)
                } else if (response.data.message === 'Email not exists.'){
                    setCodeAlert(false, false, true, false)
                } else if (response.data.message === 'Send email error.'){
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
                if (response.data.message === 'Invalid'){
                    setAlert(false, true)
                }
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await setPassword({code, email, password: newPassword})
        setClick(!click)
    }

    const sendCode = async e => {
        e.preventDefault()
        await getVerifyCode({email})
        setSendClick(!click)
    }

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
        <div className="container">
            <div id='logo'>
                <img src={FeedMe} alt='feedme' id="feedmelogo"/>
            </div>
            <div className="body">
                
                <form id="info" ref={formRef} onSubmit={handleSubmit}>
                <div id="header">
                    <h2 className="infos" id="title">Forget Password</h2>
                </div>

                    <input type="text" placeholder='Email' className="input infos" autoComplete='off' onChange={e=>setEmail(e.target.value)}/>
                       <div className="d-flex" >
                        <input type="text" placeholder='Verify Code' className="input infos mr-auto p-2" id="code" autoComplete='off' onChange={e=>setCode(e.target.value)}/>
                        <button id="send" className="infos" type="button" onClick={e=>{checkEmailValid();sendCode(e)}} ref={emailRef}>Get Verification Code</button>
                    </div>
                    <input type="password" placeholder='New Password' className="input infos" ref={passwordRef} onChange={e=>setNewPassword(e.target.value)}/>
                    {/* <input type="submit" value="Reset" className="infos" id="reset"/> */}
                    <button type="submit" className="infos" id="reset" onClick={e=>checkValid(e)}>
                        Reset Password
                    </button>

                {/* <input type="text" placeholder='Email' className="input infos" autoComplete='off'/>
                <button type="submit" className="infos" id="reset">
                    Sent Reset Email
                </button> */}

                </form>
            </div>
        </div>
    )
}

export default SetLogin;
