import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { allChProducts } from '../../../../data';
import ShowContext from '../../../../index'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider.css';
import {Navigation } from 'swiper/modules';

export default function SliderComponent() {
  const [swiperRef, setSwiperRef] = useState(null);
const {index} = useContext(ShowContext);

  const [changeImg, setChangeImg] = useState(allChProducts.All[index - 1].img1)

  return (
    <>
          <img
        className='img'
        src={changeImg}
        alt=''
      />
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}

        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={allChProducts.All[index - 1].img1}
              alt='/'
              onClick={()=>{setChangeImg(allChProducts.All[index - 1].img1)}}/></SwiperSlide>
        <SwiperSlide><img src={allChProducts.All[index - 1].img2}
              alt='/'
              onClick={()=>{setChangeImg(allChProducts.All[index - 1].img2)}}/></SwiperSlide>

      </Swiper>
    </>
  );
}