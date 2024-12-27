// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import { Link } from 'react-router-dom';
import '../style/SwiperStyle.scss'
import '@splidejs/react-splide/css';
import { useSelector } from 'react-redux';
import {Splide, SplideSlide} from '@splidejs/react-splide';



const SwiperCard = () => {
  const { mainMovies } = useSelector((state) => state.movies)

  return (
    <>
      <Splide options={{ 
        rewind: true, 
        perPage: 6,
        gap: '10px', 
        breakpoints: {
          800:{
            perPage: 3
          },
          1100:{
            perPage: 4
          }
        }
        }}>
        {mainMovies.map((movie) => (
          <SplideSlide key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                className='w-[150px]'
              ></img>
            </Link>
          </SplideSlide>
        ))}
      </Splide>

      {/* <div className='flex justify-center'>
        <div className='swiper-container'>
          <Swiper
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
          >
            {mainMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/detail/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}></img>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div> */}
    </>
  );
};

export default SwiperCard;