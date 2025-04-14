import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../style/SwiperStyle.scss";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import LinkButton from "./buttons/LinkButton";

const SwiperCard = () => {
  const { data } = useSelector((state) => state.movies);

  return (
    <>
      <div className="flex justify-center">
        <div className="swiper-container">
          <Swiper
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
          >
            {data.map((movie) => (
              <SwiperSlide key={movie.id}>
                <LinkButton
                  to={`/detail/${movie.id}`}
                  children={
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    />
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </>
  );
};

export default SwiperCard;
