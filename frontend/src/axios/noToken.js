import axios from 'axios';

const userRequest = axios.create({
    baseURL: 'http://localhost:8000/api/user'
});

export const apiSignUp = data => userRequest.post('/signup', data);

const generalRequest = axios.create({
    baseURL: 'http://localhost:8000/api/general'
});

export const apiAllIngredient = () => generalRequest.get('/ingredient');
export const apiAllCategory = () => generalRequest.get('/category');
export const apiAllLabel = () => generalRequest.get('/label');