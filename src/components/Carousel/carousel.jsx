import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ProductCard from "../Card/Card";


const Carousel = (props) => {
  const {config, sliderList} = props;
  // console.log(sliderList);
  return (
    <>
      <Slider {...config}>
        {
          sliderList && 
          Array.isArray(sliderList) && 
          sliderList.map((listItem)=>{
            if(listItem.imageUrl){
              return (
                <Link to="ac" key={listItem.id}><div><img src={listItem.imageUrl} alt={listItem.displayName} /></div></Link>
              )
            }
            else {
              return (
                <ProductCard product={listItem} key={listItem._id}/>
              )
            }
          }) 
        }
      </Slider>
    </>
  );
};

export default Carousel;