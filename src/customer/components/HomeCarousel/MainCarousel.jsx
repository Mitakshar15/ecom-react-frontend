import React from 'react';
import { MainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';

const MainCarousel = () => {

    const items = MainCarouselData.map((item)=> <img className="cursor-pointer -z-10 w-full max-h-[550px]"role="presentation" src={item.image} alt=""/>)

  return (
    <div className='mt-[105px]'>
    <AliceCarousel
    items={items}
    disableButtonsControls
    autoPlay
    autoPlayInterval={1000}
    infinite

    />
    </div>

  );
}

export default MainCarousel;
