import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

const SwiperCard = ({ movies }) => {
  return (
    <>
      <div className='flex justify-center'>
        <div className='swiper-container'>
          <Swiper
            slidesPerView={3.5}
            spaceBetween={10}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-next'
            }}
          >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Link to={`/detail/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}></img>
                  </Link>
                </SwiperSlide>
              ))}
            <div className='swiper-button-prev ml-[10px]'></div>
            <div className='swiper-button-next mr-[10px]'></div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SwiperCard;