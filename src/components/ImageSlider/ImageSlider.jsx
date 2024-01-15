import React from "react";
import "./ImageSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ImageSlider(props) {
  const { imageList, handleClick } = props;
  // console.log(imageList);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  return (
    <div style={{ width: "100%", marginTop: "20px", marginBottom: "100px" }}>
      <Slider {...settings} style={{ width: "85%", margin: "auto" }}>
        {imageList &&
          imageList.map((image, index) => (
            <div style={{ width: "100px", height: "100px" }} key={index}>
              <img
                src={image}
                style={{ width: "100px", width: "100px" }}
                onClick={(e) => handleClick(e.target.src)}
                onError={(e) => {
                  e.currentTarget.src = "/img_404.svg";
                }}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
