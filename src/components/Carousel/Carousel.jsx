import React, { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MusicCard from "../MusicCard/MusicCard";
import LeftNavigationButton from "../NavigationButtons/LeftNavigationButton";
import RightNavigationButton from "../NavigationButtons/RightNavigationButton";
import styles from "./Carousel.module.css";

const Carousel = ({ albumData, id }) => {
  return (
    <div className={styles.carousel}>
      <LeftNavigationButton className={`${styles.crp} carousel-prev-${id}`} />
      <Swiper
        modules={[Navigation]}
        slidesPerView={7}
        slidesPerGroup={1}
        spaceBetween={16}
        watchOverflow
        navigation={{
          prevEl: `.carousel-prev-${id}`,
          nextEl: `.carousel-next-${id}`,
        }}
      >
        {albumData?.map((album) => (
          <SwiperSlide key={album.id}>
            <MusicCard album={album} />
          </SwiperSlide>
        ))}
      </Swiper>
      <RightNavigationButton className={`${styles.crn} carousel-next-${id}`} />
    </div>
  );
};

export default Carousel;
