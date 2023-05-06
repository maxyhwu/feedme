import axios from 'axios';

const userRequest = axios.create({
    baseURL: 'http://localhost:8000/api/user'
});

const loginRequest = axios.create({
    baseURL: 'http://localhost:8000/api/oauth/auth'
});

const generalRequest = axios.create({
    baseURL: 'http://localhost:8000/api/general'
});

export const apiLoginTwitter = data => loginRequest.post('/twitter', data);
export const apiLogin = data => userRequest.post('/login', data);
export const apiSignUp = data => userRequest.post('/signup', data);
export const apiForgetPW = data => userRequest.post('/forgotpw', data);
export const apiSetPW = data => userRequest.post('/setPassword', data);

export const apiAllIngredient = () => generalRequest.get('/ingredient');
export const apiAllCategory = () => generalRequest.get('/category');
export const apiAllLabel = () => generalRequest.get('/label');