'use client';

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from 'next/image';


interface Props {
  images:string[];
  title:string;
  className?:string;
}

export const MobileSlideshow = ({images,title,className}:Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ 
          width:'100vw',
          height:'500px',  
        }}
        pagination
        autoplay={{delay: 2500}}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map((image,index) => (
            <SwiperSlide key={index}>
              <Image src={`/products/${image}`} alt={title} width={600} height={500} className='object-fill' />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
