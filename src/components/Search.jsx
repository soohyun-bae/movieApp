import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMovie, fetchSearch } from '../rtk/thunk';
import MovieCard from '../pages/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const {searchMovies} = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  useEffect(() => {
    if(query){
      dispatch(fetchSearch(query))
    }else{
      dispatch(fetchMovie())
    }
  }, [query]);

  console.log(searchMovies)

  return (
    <div>
      <h1 className='w-[100vw] text-[30px] '>'{query}' 검색 결과</h1>
      {searchMovies && searchMovies.length > 0 ? (
        <ul>
          {/* {movie.map((el) => ( */}

            <MovieCard movie={searchMovies}/>
            {/* // <li key={el.id}>
            //   <img src={`https://image.tmdb.org/t/p/w200${el.poster_path}`}></img>
            //       <div className='mx-[10px] my-[5px]'>
            //         <p>{el.title}</p>
            //         <div>⭐️{el.vote_average}</div>
            //       </div>
            // </li>
          ))} */}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default Search;