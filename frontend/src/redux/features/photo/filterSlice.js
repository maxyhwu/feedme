import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredPhotos: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_PHOTOS(state, action) {
            const { photos, search } = action.payload;
            const tempPhotos = photos.filter(
              (photo) =>
                  photo.name.toLowerCase().includes(search.toLowerCase()) ||
                  photo.category.toLowerCase().includes(search.toLowerCase())
            );

            state.filteredPhotos = tempPhotos;
        },
    },
});

export const { FILTER_PHOTOS } = filterSlice.actions;

export const selectFilteredPhotos = (state) => state.filter.filteredPhotos;

export default filterSlice.reducer;
