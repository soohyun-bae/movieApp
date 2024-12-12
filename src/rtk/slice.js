import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails, fetchMovie, fetchSearch } from "./thunk";

// export const movieSlice = createSlice({
//   name: 'movies',
//   initialState:{
//     data: [],
//     loading: true,
//   },
//   reducers:{
//     setSearchMovies(state, action){
//       state.data = action.payload
//     }
//   },
//   extraReducers:(builder) => {
//     builder
//     .addCase(fetchMovie.pending, (state) => {
//       state.loading=true
//     })
//     .addCase(fetchMovie.fulfilled, (state, action) => {
//       state.loading = false;
//       console.log('sliceData', action.payload)
//       state.data = action.payload;
//     })
//     .addCase(fetchMovie.rejected, (state) => {
//       state.loading = false
//     })
//   }
//   }
// )

// export const {setSearchMovies} = movieSlice.actions


export const detailSlice = createSlice({
  name: 'details',
  initialState: {
    list: {},
    loading:true,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchDetails.pending, (state) => {
      state.loading=true;
    })
    .addCase(fetchDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchDetails.rejected, (state) => {
      state.loading=false;
    })
  }
})

// export const searchSlice = createSlice({
//   name: 'search',
//   initialState: {
//     movie: [],
//     loading:true,
//   },
//   extraReducers: (builder) => {
//     builder
//     .addCase(fetchSearch.pending, (state) => {
//       state.loading=true
//     })
//     .addCase(fetchSearch.fulfilled, (state, action) => {
//       state.loading = false;
//       console.log('movie', action.payload)
//       state.movie = action.payload;
//     })
//     .addCase(fetchSearch.rejected, (state) => {
//       state.loading=false
//     })
//   }
// })

export const movieSlice = createSlice({
  name: 'movies',
  initialState:{
    mainMovies: [],
    searchMovies: [],
    loading: true,
  },
  reducers:{
    setMovies(state, action) {
      state.mainMovies=action.payload;
    },
    resetMovies(state){
      state.mainMovies = [],
      state.loading=true
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchMovie.pending, (state) => {
      state.loading= true;
    })
    .addCase(fetchMovie.fulfilled, (state, action) => {
      state.loading=false;
      state.mainMovies = action.payload;
    })
    .addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSearch.fulfilled, (state, action) => {
      state.loading=false;
      state.searchMovies=action.payload
    })
  }
})

export const {setMovies, resetMovies} = movieSlice.actions