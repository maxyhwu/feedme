import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "./photoService";
import { toast } from "react-toastify";



const initialState = {
    photo: null,
    photos: [],
    isError: false,
    isSuccess: false,
    // isLoading: false,
    message: "",
    category: [],
};

// Create New Photo
export const createPhoto = createAsyncThunk(
  
    "photos/create",
    async (formData, thunkAPI) => {
        try {
            return await photoService.createPhoto(formData);
        } catch (error) {
            const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all Photos
export const getPhotos = createAsyncThunk(
    "photos/getAll",
    async (_, thunkAPI) => {
        try {
            return await photoService.getPhotos();
        } catch (error) {
            const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete a Photo
export const deletePhoto = createAsyncThunk(
    "photos/delete",
    async (id, thunkAPI) => {
        try {
            return await photoService.deletePhoto(id);
        } catch (error) {
            const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get a photo
export const getPhoto = createAsyncThunk(
    "photos/getPhoto",
    async (id, thunkAPI) => {
      try {
        return await photoService.getPhoto(id);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);
// Update product
export const updatePhoto = createAsyncThunk(
    "photos/updatePhoto",
    async ({ id, formData }, thunkAPI) => {
        try {
            return await photoService.updatePhoto(id, formData);
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        CALC_CATEGORY(state, action) {
            const photos = action.payload;
            const array = [];
            photos.map((item) => {
                const { category } = item;

                return array.push(category);
            });
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
        }
    }
});

export const { CALC_CATEGORY } = photoSlice.actions;
export const selectPhoto = (state) => state.photo.photo;
export const selectCategory = (state) => state.photo.category;

export default photoSlice.reducer;