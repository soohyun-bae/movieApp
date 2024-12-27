import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovie } from '../rtk/thunk';
import { setMovies } from '../rtk/slice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()
  let { mainMovies, loading } = useSelector((state) => state.movies)


  useEffect(() => {
    if (loading) {
      dispatch(fetchMovie())
    }
    if(movie) {
      dispatch(setMovies(movie))
    }

  }, [movie])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className='main-card-container'>
        <div className='text-movie'>Movie</div>
        <div className='movie-wrap'>
          {
            mainMovies.map((el) => (
              <Link key={el.id} to={`/detail/${el.id}`} className='link'>
                <div className='movie-card'>
                  <img src={`https://image.tmdb.org/t/p/w200${el.poster_path}`}></img>
                  <div className='mx-[10px] my-[5px]'>
                    <p>{el.title}</p>
                    <div>⭐️{el.vote_average}</div>
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