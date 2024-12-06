import React from 'react';
import { useParams } from 'react-router-dom';
import movieListData from '../movieListData.json'
import movieDetailData from '../movieDetailData.json'

const MovieDetail = () => {
  const { id } = useParams()
  const movie = movieListData.results.find((movie) => movie.id === Number(id))
  
  const genres = movie.genre_ids.map((genreId) => {
    const genre = movieDetailData.genres.find((genre) => genre.id === genreId)
    return genre ? <div className='genre'>{genre.name}</div> : null
  })
  console.log(genres)

  const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`

  

  return (
    <div className='movie-detail-card'>
      <img src={posterUrl} className='w-[350px]'></img>
      <div className='detail-container'>
        <div className='title-vote'>
          <h1>{movie.title}</h1>
          <div>⭐️{movie.vote_average}</div>
        </div>
        <div className='genre-container'>{genres}</div>
        <div className='overview'>{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;