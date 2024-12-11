import { configureStore } from "@reduxjs/toolkit";
import { detailSlice, movieSlice } from "./slice";

export const store = configureStore({
  reducer:{
    movies: movieSlice.reducer,
    details: detailSlice.reducer,
  }
})