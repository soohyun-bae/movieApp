import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails, fetchMovie } from "./thunk";

export const movieSlice = createSlice({
  name: 'movies',
  initialState:{
    data: [],
    loading: true,
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchMovie.pending, (state) => {
      state.loading=true
    })
    .addCase(fetchMovie.fulfilled, (state, action) => {
      state.loading = false;
      console.log('sliceData', action.payload)
      state.data = action.payload;
    })
    .addCase(fetchMovie.rejected, (state) => {
      state.loading = false
    })
  }
  }
)

export const detailSlice = createSlice({
  name: 'details',
  initialState: {
    list: {},
    loading:true,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchDetails.pending, (state) => {
      state.loading=true
    })
    .addCase(fetchDetails.fulfilled, (state, action) => {
      state.loading = false,
      console.log('sliceGenreData', action.payload)
      state.list = action.payload;
    })
    .addCase(fetchDetails.rejected, (state) => {
      state.loading=false
    })
  }
})