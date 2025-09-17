import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const MainCarousel = () => {
  const items = MainCarouselData.map((item, index) => {
    const isVideo = item.image.endsWith('.mp4');

    return (
      <div key={index} className="w-full h-full">
        {isVideo ? (
          <video
            className="w-full h-auto rounded-2xl shadow-md cursor-pointer"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={item.image} type="video/mp4" />
          </video>
        ) : (
          <img
            className="w-full h-auto rounded-2xl shadow-md cursor-pointer"
            role="presentation"
            src={item.image}
            alt={`carousel-media-${index}`}
          />
        )}
      </div>
    );
  });

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      disableDotsControls
      autoPlay
      autoPlayInterval={10000}
      infinite
      animationType="fadeout"
      animationDuration={1000}
    />
  );
};

export default MainCarousel;
