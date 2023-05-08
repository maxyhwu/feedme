import React, {useContext, useState} from 'react'
import { getUserData } from '../Cookies/cookies';

const LoginContext = React.createContext({
    login: [],
    changeLogin: () => {}
    }
);


const LoginContextProvider = (props) => {
    const hasToken = localStorage.getItem('user')?true:(Object.keys(getUserData()).length !== 0?true:false)
    const [login, setLogin] = useState(hasToken)
    const changeLogin = (input) => {
        setLogin(input)
    }
    return (
        <LoginContext.Provider value={{login, changeLogin}}>
            {props.children}
        </LoginContext.Provider>
    );
}

const UseLoginContext = () => {
    return useContext(LoginContext)
}

export { LoginContextProvider, UseLoginContext };