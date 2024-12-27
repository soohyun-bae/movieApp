import { configureStore } from "@reduxjs/toolkit";
import { detailSlice, loginInputSlice, movieSlice } from "./slice";

export const store = configureStore({
  reducer:{
    movies: movieSlice.reducer,
    details: detailSlice.reducer,
    loginInput : loginInputSlice.reducer,
  }
})