import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const MainCarousel = () => {

  const items = MainCarouselData.map((item) => {
    // Check if the item's image URL is a video
    const isVideo = item.image.endsWith('.mp4');

    if (isVideo) {
      return (
        <video
          className='cursor-pointer'
          autoPlay
          loop
          muted
          src={item.image}
          alt=""
        />
      );
    } else {
      return (
        <img
          className='cursor-pointer'
          role='presentation'
          src={item.image}
          alt=""
        />
      );
    }
  });

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      disableDotsControls
      autoPlay
      autoPlayInterval={10000}
      infinite
    />
  );
};

export default MainCarousel;
