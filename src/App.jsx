import { useState } from 'react'
import './App.scss'
import MovieCard from './components/MovieCard'
import movieListData from './movieListData.json'
import { Route, Routes } from 'react-router-dom'
import MovieDetail from './components/MovieDetail'
import Layout from './components/Layout'
import SwiperCard from './components/SwiperCard'



function App() {
  const [movies] = useState(movieListData.results)

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={
              <div>
                <SwiperCard movies={movies} />
                <MovieCard movies={movies} />
              </div>
            }></Route>
            <Route path='/detail/:id' element={<MovieDetail />}></Route>
          </Route>
        </Routes>
      </div >
    </>
  )
}

export default App
