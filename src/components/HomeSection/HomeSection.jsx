import React from 'react';
import './HomeSection.css';
import Carousel from '../Carousel/carousel';
import { Button } from '@mui/material';

function HomeSection({sliderList, categoryName, config}) {
  return (
    <div className='home-section-slider'>
      <div>
        <div className='section-header'>
          <span>{categoryName}</span>
          <button>View all</button>
        </div>
        <div className='slider-top-container'>
          <div className='slider-container'>
            <Carousel sliderList={sliderList} config={config}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection;