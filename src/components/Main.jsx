import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';


const Main = ({movies}) => {
  return (
    <div>
      <div className='movie-wrap'>
                {movies.map((movie) => (
                  <Link key={movie.id} to={`/detail/${movie.id}`} className='link'>
                    <MovieCard posterPath={movie.poster_path} title={movie.title} voteCount={movie.vote_average} />
                  </Link>
                ))}
              </div>
    </div>
  );
};

export default Main;