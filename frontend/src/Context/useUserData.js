import React, {useContext, useState} from 'react'
import { getUserData } from '../Cookies/cookies';

const DataContext = React.createContext({
    data: [],
    chageData: () => {}
    }
);

const getData = () =>  {
    var userData = {
        userName:'',
        email:'',
        token:'',
        fridge: null,
        favorite: []
    }
    if (localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ){
        const dataString = localStorage.getItem('user');
        userData = JSON.parse(dataString);  // 字串轉換成物件
    } else if ( getUserData() !== "{}" ){
        userData = getUserData();
    }
    return userData     
}

const DataContextProvider = (props) => {
    const [data, setData] = useState(getData())
    const changeData = (input) => {
        console.log(input)
        localStorage.setItem('user',JSON.stringify(input));
        setData(input)
    }
    return (
        <DataContext.Provider value={{data, changeData}}>
            {props.children}
        </DataContext.Provider>
    );
}

const UseDataContext = () => {
    return useContext(DataContext)
}

export { DataContextProvider, UseDataContext };