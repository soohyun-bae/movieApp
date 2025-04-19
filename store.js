import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./src/features/auth/authSlice";
import { detailSlice, movieSlice } from "./src/features/movie/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    details: detailSlice.reducer,
    auth: authSlice.reducer,
  }
})