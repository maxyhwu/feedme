import React, {useContext, useState} from 'react'

const LangContext = React.createContext({
    lang: "en",
    changeLang: () => {}
    }
);



const LangContextProvider = (props) => {
    const [lang, setLang] = useState('en')
    const changeLang = (input) => {
        setLang(input)
    }
    return (
        <LangContext.Provider value={{lang, changeLang}}>
            {props.children}
        </LangContext.Provider>
    );
}

const UseLangContext = () => {
    return useContext(LangContext)
}

export { LangContextProvider, UseLangContext };