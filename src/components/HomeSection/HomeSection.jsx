import React from 'react';
import './HomeSection.css';
import Carousel from '../Carousel/carousel';
import { Link } from 'react-router-dom';

function HomeSection({sliderList, categoryName, config}) {
  return (
    <div className='home-section-slider'>
      <div>
        <div className='section-header'>
          <span>{categoryName}</span>
          <Link to={`page/${sliderList[0]?.sellerTag === categoryName.toLowerCase() ? sliderList[0]?.sellerTag : sliderList[0]?.subCategory}`}><button>View all</button></Link>
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