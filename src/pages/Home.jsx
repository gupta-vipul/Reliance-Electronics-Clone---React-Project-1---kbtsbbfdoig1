import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel/carousel';
import { v4 as uuidv4 } from 'uuid';
import HomeSection from '../components/HomeSection/HomeSection';
import { GET_PRODUCTS_FOR_HOMEPAGE } from '../Constants/APIs';

const Home = () => {
  const [trendingList, setTrendingList] = useState([]);
  const sliderList = [
    {
      id: uuidv4(),
      imageUrl: "Air-Purifier-1365x260.jpeg",
      path: "ac",
      displayName: "Air-Purifier-1365x260",
    },
    {
      id: uuidv4(),
      imageUrl: "Audio-Banner-D.jpeg",
      path: "audio",
      displayName: "Audio-Banner"
    },
    {
      id: uuidv4(),
      imageUrl: "Best-Selling-Smartphones-HPMC-Banners-D.jpeg",
      path: "mobile",
      displayName: "Best-Selling-Smartphones-HPMC-Banners",
    },
    {
      id: uuidv4(),
      imageUrl: "Digital-Clearance-Sale-Carousel-Banner-30.11.2023.jpeg",
      path: "/",
      displayName: "Digital-Clearance-Sale-Carousel-Banner",
    },
    {
      id: uuidv4(),
      imageUrl: "Mobile-Accessories-Fiesta-banner-D-1-Dec-rev-1.jpeg",
      path: "/mobile",
      displayName: "Mobile-Accessories-Fiesta-banner",
    }
  ];
  const mainBannerCarouselConfig = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const trendingConfig = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
  };
  async function getDataForHomePage() {
    const response = await fetch(GET_PRODUCTS_FOR_HOMEPAGE,{
      headers: {
        'projectID' : 'kbtsbbfdoig1',
      }
    });
    const jsonData = await response.json();

    setTrendingList(jsonData.data);
  }

  useEffect(()=>{
    getDataForHomePage();
  },[])
  return (
    <>
        <Carousel sliderList={sliderList} config={mainBannerCarouselConfig}/>
        <HomeSection sliderList={trendingList} config={trendingConfig} categoryName={"Trending"}/>
        {/* <div>Home Section</div> */}
    </>
  )
}

export default Home;