import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async () => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: import.meta.env.VITE_API_KEY
      }
    })
    const filteredMovies = response.data.results.filter(movie => !movie.adult)
    console.log('fetch', response);
    return filteredMovies
  }
)

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async( movie_id ) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`,{
      params:{
        api_key: import.meta.env.VITE_API_KEY
      }
    })
    console.log('fetchGenre', response.data.genres);
    return response.data
  }
)