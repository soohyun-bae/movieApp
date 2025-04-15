import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { detailSlice, movieSlice } from "./slice";

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    details: detailSlice.reducer,
    auth: authSlice.reducer,
  }
})