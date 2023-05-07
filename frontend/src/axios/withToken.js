import axios from 'axios';
import { getUserData } from '../Cookies/cookies';

var token = ''
token = JSON.parse(localStorage.getItem('user')).token
if ( getUserData().token ){
    token = JSON.parse(localStorage.getItem('user')).token
}
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : `http://localhost:8000/`;


const userRequest = axios.create({
    baseURL: API_ROOT + 'api/user'
});

const recipeRequest = axios.create({
    baseURL: API_ROOT + 'api/recipe'
});

export const apiEditProfile = data => userRequest.post('/edit-profile', data);
export const apiEditFridge = data => userRequest.put('/edit-fridge', data);
export const apiKeepRecipes = data => userRequest.put('/keep-recipes', data);
export const apiUploadImage = formData => userRequest.post('/upload-image', formData);
export const apiGetUserImage = () => userRequest.get('/get-myimage');
export const apiUpdateUserImage = data => userRequest.put('/update-image', data);
export const apiDeleteUserImage = data => userRequest.delete('/delete-image', data); 

export const apiQueryRecipeByID = id => recipeRequest.get('/query/id', {params:{ id }});
export const apiQueryRecipeByName = name => recipeRequest.get('/query/name', {params:{ name }});
export const apiQueryRecipeByLabel = label => recipeRequest.get('/query/label', {params:{ label }});
export const apiQueryRecipeByTop = page => recipeRequest.get('/query/top', {params:{ page }});
export const apiQueryRecipeByIngredient = ingredient => recipeRequest.get('/query/ingredient', {params:{ ingredient }});

export const apiGetRecipeComment = id => recipeRequest.get('/get/comment-data', {params:{ id }});

export const apiUpdateLikeCount = data => recipeRequest.put('/update/likeCount', data);
export const apiUpdateRecipe = data => recipeRequest.put('/update/recipe', data);

export const apiAddNew = data => recipeRequest.put('/add/new', data);
export const apiAddComment = data => recipeRequest.put('/add/comment', data);

