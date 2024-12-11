import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchDetails } from '../rtk/thunk';

const MovieDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {list, loading} = useSelector((state) => state.details)

  useEffect(() => {
    if(loading)
    {dispatch(fetchDetails(id))}
  }, [dispatch, loading])
  if(loading) return <div>Loading...</div>

  const genres = list.genres?.map(genre => genre.name)

  return (
    <div className='movie-detail-card'>
      <img src={`https://image.tmdb.org/t/p/w200${list.poster_path}`} alt={list.title} className='w-[350px]'></img>
      <div className='detail-container'>
        <div className='title-vote'>
          <h1>{list.title}</h1>
          <div>⭐️{list.vote_average}</div>
        </div>
        <div className='genre-container'>{genres}</div>
        <div className='overview'>{list.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;