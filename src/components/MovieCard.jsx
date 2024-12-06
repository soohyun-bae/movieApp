import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movies }) => {

  return (
    <>

      <div className='main-card-container'>
      <div className='text-[50px] mx-[30px]'>Movie</div>
        <div className='movie-wrap'>
          {
            movies.map((movie) => (
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