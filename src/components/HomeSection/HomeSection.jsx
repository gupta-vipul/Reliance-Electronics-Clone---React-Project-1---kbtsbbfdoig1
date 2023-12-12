import React from 'react';
import './HomeSection.css';
import Button from '../Button/Button';
import Carousel from '../Carousel/carousel';

function HomeSection({sliderList, categoryName, config}) {
  return (
    <div className='home-section-slider'>
      <div>
        <span>{categoryName}</span>
        <Button>View all</Button>
        <div className='slider-container'>
          <Carousel sliderList={sliderList} config={config}/>
        </div>
      </div>
    </div>
  )
}

export default HomeSection;