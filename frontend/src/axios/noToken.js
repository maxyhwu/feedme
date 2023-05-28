import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://localhost:8000/`;

const userRequest = axios.create({
    baseURL: API_ROOT + 'api/user'
});

const loginRequest = axios.create({
    baseURL: API_ROOT + 'api/oauth/auth'
});

const generalRequest = axios.create({
    baseURL: API_ROOT + 'api/general'
});

const envRequest = axios.create({
    baseURL: API_ROOT + 'api/env'
  });

// const userRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/user'
//     baseURL: "https://feedme-72yq.onrender.com/api/user"
// });

// const loginRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/oauth/auth'
//     baseURL: "https://feedme-72yq.onrender.com/api/oauth/auth"
// });

// const generalRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/general'
//     baseURL: "https://feedme-72yq.onrender.com/api/general"
// });

// const envRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/env'
//     baseURL: "https://feedme-72yq.onrender.com/api/env"
//   });

export const apiLoginTwitter = data => loginRequest.post('/twitter', data);
export const apiLogin = data => userRequest.post('/login', data);
export const apiSignUp = data => userRequest.post('/signup', data);
export const apiForgetPW = data => userRequest.post('/forgotpw', data);
export const apiSetPW = data => userRequest.post('/setPassword', data);
export const apiGetEnv = data => envRequest.post('/getenv', data);

export const apiAllIngredient = () => generalRequest.get('/ingredient');
export const apiAllCategory = () => generalRequest.get('/category');
export const apiAllLabel = () => generalRequest.get('/label');
