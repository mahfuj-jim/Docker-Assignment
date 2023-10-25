import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: {
    search: "",
    genreFilter: "",
    sortProperty: "",
    sortOrder: ""
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchItem: (state, action) => {
      state.searchData.search = action.payload;
    },
    updateGenreFilter: (state, action) => {
      state.searchData.genreFilter = action.payload;
    },
    updateSortProperty: (state, action) => {
      state.searchData.sortProperty = action.payload;
    },
    updateSortOrder: (state, action) => {
      state.searchData.sortOrder = action.payload;
    },
  },
});

export const { updateSearchItem, updateGenreFilter, updateSortProperty, updateSortOrder } = searchSlice.actions;
export default searchSlice.reducer;
