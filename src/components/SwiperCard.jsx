import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import '../SwiperStyle.scss'

const SwiperCard = ({ movies }) => {
  return (
    <>
      <div className='flex justify-center'>
        <div className='swiper-container'>
          <Swiper
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/detail/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}></img>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SwiperCard;