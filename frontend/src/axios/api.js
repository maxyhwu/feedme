import axios from 'axios';

var token = ''
token = JSON.parse(localStorage.getItem('user')).token
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const loginRequest = axios.create({
    baseURL: 'http://localhost:8000/api/oauth/auth'
});

const userRequest = axios.create({
    baseURL: 'http://localhost:8000/api/user'
});

const recipeRequest = axios.create({
    baseURL: 'http://localhost:8000/api/recipe'
});

const generalRequest = axios.create({
    baseURL: 'http://localhost:8000/api/general'
});

export const apiLoginTwitter = data => loginRequest.post('/twitter', data);
export const apiLogin = data => userRequest.post('/login', data);
export const apiSign = data => userRequest.post('/signup', data);
export const apiForgetPW = data => userRequest.post('/forgetpw', data);
export const apiEditProfile = data => userRequest.post('/edit-profile', data);
export const apiGetImage = () => userRequest.get('/get-image');
export const apiEditFridge = data => userRequest.put('/edit-fridge', data);
export const apiKeepRecipes = data => userRequest.put('/keep-recipes', data);
export const apiUpdateImage = data => userRequest.put('/update-image', data);
export const apiDeleteImage = data => userRequest.delete('/delete-image', data); 

export const apiQueryID = () => recipeRequest.get('/query/id');
export const apiQueryName = () => recipeRequest.get('/query/name');
export const apiQueryLabel = () => recipeRequest.get('/query/label');
export const apiQueryTop = () => recipeRequest.get('/query/top');
export const apiQueryIngredient = () => recipeRequest.get('/query/ingredient');

export const apiUpdateLikeCount = data => recipeRequest.put('/update/likeCount', data);
export const apiUpdateRecipe = data => recipeRequest.put('/update/recipe', data);

export const apiAddNew = data => recipeRequest.put('/add/new', data);
export const apiAddComment = data => recipeRequest.put('/add/comment', data);

export const apiAllIngredient = () => generalRequest.get('/ingredient');
export const apiAllCategory = () => generalRequest.get('/category');
export const apiAllLabel = () => generalRequest.get('/label');