import axios from 'axios';

const loginRequest = axios.create({
    baseURL: 'http://localhost:8000/api/oauth/auth'
});

export const apiLoginTwitter= data => loginRequest.post('/twiiter', data);