import axios from 'axios';
import { getUserData } from '../Cookies/cookies';

var token = ''
if ( (localStorage.getItem('user') !== 'undefined' && localStorage.getItem('user') !== null) ){
    token = JSON.parse(localStorage.getItem('user')).token
}
if ( (Object.keys(getUserData()).length !== 0) ){
    token = getUserData().token
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

// const userRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/user'
//     baseURL: "https://feedme-72yq.onrender.com/api/user"
// });

// const recipeRequest = axios.create({
//     // baseURL: 'http://localhost:8000/api/recipe'
//     baseURL: "https://feedme-72yq.onrender.com/api/recipe"
// });

export const apiEditProfile = data => userRequest.put('/edit-profile', data);
export const apiEditFridge = data => userRequest.put('/edit-fridge', data);
export const apiKeepLikeRecipes = data => userRequest.put('/keep-like-recipes', data);
export const apiRemoveLikeRecipes = data => userRequest.put('/remove-like-recipes', data);
export const apiUploadImage = formData => userRequest.post('/upload-image', formData);
export const apiGetUserImage = () => userRequest.get('/get-myimage');
export const apiUpdateUserImage = data => userRequest.put('/update-image', data);
export const apiGetUserData = () => userRequest.get('/get-userdata');

export const apiQueryRecipeByID = id => recipeRequest.get('/query/id', {params:{ id }});
export const apiQueryRecipeByName = title => recipeRequest.get('/query/name', {params:{ title }});
export const apiQueryRecipeByLabel = label => recipeRequest.get('/query/label', {params:{ label }});
export const apiQueryRecipeByTop = page => recipeRequest.get('/query/top', {params:{ page }});
export const apiQueryRecipeByIngredient = ingredient => recipeRequest.get('/query/ingredient', {params:{ ingredient }});
export const apiQueryRecipeByUser = () => recipeRequest.get('/query/user');
export const apiQueryRecipeTotalCount = () => recipeRequest.get('/query/totalCount');
export const apiQueryRecipebyFridge = () => recipeRequest.get('/query/fridge');

export const apiDeleteRecipeByID = id => recipeRequest.delete('/delete/id', {params:{ id }});

export const apiGetRecipeComment = id => recipeRequest.get('/get/comment-data', {params:{ id }});

export const apiUpdateAddLikeCount = data => recipeRequest.put('/update/addlikeCount', data);
export const apiUpdateMinusLikeCount = data => recipeRequest.put('/update/minuslikeCount', data);
export const apiUpdateRecipe = data => recipeRequest.put('/update/recipe', data);

export const apiAddNew = data => recipeRequest.put('/add/new', data);
export const apiAddComment = data => recipeRequest.put('/add/comment', data);

