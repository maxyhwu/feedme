import { useState } from 'react';

export default function useData() {
    const getData = () =>  {
        var userData = {
            userName:'',
            email:'',
            token:'',
            fridge: null
        }
        if (localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null ){
            const dataString = localStorage.getItem('user');
            userData = JSON.parse(dataString);  //字串轉換成物件
        }
        return userData     //?.避免undefined出現的error
    }
    const [data, setData] = useState(getData());

    const saveUser = userData => {
        localStorage.setItem('user',JSON.stringify(userData));
        setData(userData);
    };

    return {
        setData: saveUser,
        data
    }
}