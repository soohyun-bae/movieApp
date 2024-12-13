import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie',
  async () => {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        sort_by: "popularity.desc",
        page: 1,
        include_adult: false,
        adult: false,
        without_genres: "2781",
        with_release_type: "2|3",
        certification_country: 'KR',
        certification: '15'
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      }
    })
    console.log(response.data.results)
    return response.data.results
  }
)

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async (movie_id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY
      }
    })
    console.log('fetchGenre', response.data.genres);
    return response.data
  }
)

export const fetchSearch = createAsyncThunk(
  'movies/fetchSearch',
  async (query) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: import.meta.env.VITE_API_KEY,
        query,
        include_adult: false,
        adult:false,
        certification_country: 'KR',
        certification: '15'
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      }
    })
    const filteredMovies = response.data.results.filter(movie => movie.popularity >= 300);
    console.log(filteredMovies);
    return filteredMovies;
  }
)