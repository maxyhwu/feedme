import React, {useContext, useState, useEffect } from 'react'
import { apiGetEnv } from '../axios/noToken';


async function getEnv () {
    return apiGetEnv()
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
}

const EnvContext = React.createContext({
    login: [],
    changeLogin: () => {}
    }
);


const EnvContextProvider = (props) => {
    const [env, setEnv] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getEnv();
            if (response.success) {
                setEnv(response.data)
            }
        }

        fetchData()
    }, [])

    const changeEnv = (input) => {
        setEnv(input)
    }
    return (
        <EnvContext.Provider value={{env, changeEnv}}>
            {props.children}
        </EnvContext.Provider>
    );
}

const UseEnvContext = () => {
    return useContext(EnvContext)
}

export { EnvContextProvider, UseEnvContext };