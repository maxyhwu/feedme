import Cookies from 'universal-cookie';
//cookie
const cookies = new Cookies();

export const setUserData = (data) => {
    cookies.set('user', data, 
    { path: '/',secure: true,sameSite :true}
    );
    // console.log(cookies.get('user'));
};

export const getUserData = () => {
    if (cookies.get('user')===undefined){
        return {};
    }
    return cookies.get('user');
};

export const removeUserData = () => {
    cookies.remove('user', { path: '/' });
} 