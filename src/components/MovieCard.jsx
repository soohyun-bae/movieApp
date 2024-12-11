import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovie } from '../rtk/thunk';

const MovieCard = () => {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((state) => state.movies)

  
  useEffect(() => {
    if(loading)
      {dispatch(fetchMovie())}
  }, [dispatch, loading])
  
  if(loading) return <div>Loading...</div>

  return (
    <>
      <div className='main-card-container'>
      <div className='text-[50px] mx-[30px]'>Movie</div>
        <div className='movie-wrap'>
          {
            data?.map((movie) => (
              <Link key={movie.id} to={`/detail/${movie.id}`} className='link'>
                <div className='movie-card'>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}></img>
                  <div className='mx-[10px] my-[5px]'>
                    <p>{movie.title}</p>
                    <div>⭐️{movie.vote_average}</div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default MovieCard;