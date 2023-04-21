import axios from "axios";
import { toast } from "react-toastify";


const BACKEND_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4096/api';

const API_URL = `${BACKEND_URL}/photos/`;

// Create New Photo
const createPhoto = async (formData) => {
    const response = await axios.post(API_URL, formData);
    toast.success("Photo Added!");
    return response.data;
};

// Get all Photos
const getPhotos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Delete a Photo
const deletePhoto = async (id) => {
    const response = await axios.delete(API_URL + id);
    toast.success("Photo Deleted!");
    return response.data;
};

// Get a Photo
const getPhoto = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};
// Update Photo
const updatePhoto = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    toast.success("Photo Updated!");
    return response.data;
};

// /*********************/
// // Get Photos by Category
// const getPhotosByCategory = async (category) => {
//     const response = await axios.get(API_URL + category);
//     return response.data;
// };

const photoService = {
    createPhoto,
    getPhotos,
    getPhoto,
    // getPhotosByCategory,
    deletePhoto,
    updatePhoto,
};

export default photoService;
