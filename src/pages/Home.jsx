import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel/carousel';
import { v4 as uuidv4 } from 'uuid';
import HomeSection from '../components/HomeSection/HomeSection';
import { GET_BESTSELLER_LIST, GET_NEW_ARRIVAL, GET_PRODUCTS_CATEGORYWISE, GET_PRODUCTS_FOR_HOMEPAGE } from '../Constants/APIs';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [bestSellerList, setBestSellerList] = useState([]);
  const [newArrivalList, setNewArrivalList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [acList, setAcList] = useState([]);
  const [fridgeList, setFridgeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sliderList = [
    {
      id: uuidv4(),
      imageUrl: "Air-Purifier-1365x260.jpeg",
      path: "categories/ac",
      displayName: "Air-Purifier-1365x260",
    },
    {
      id: uuidv4(),
      imageUrl: "Audio-Banner-D.jpeg",
      path: "categories/audio",
      displayName: "Audio-Banner"
    },
    {
      id: uuidv4(),
      imageUrl: "Best-Selling-Smartphones-HPMC-Banners-D.jpeg",
      path: "categories/mobile",
      displayName: "Best-Selling-Smartphones-HPMC-Banners",
    },
    {
      id: uuidv4(),
      imageUrl: "Digital-Clearance-Sale-Carousel-Banner-30.11.2023.jpeg",
      path: "categories/laptop",
      displayName: "Digital-Clearance-Sale-Carousel-Banner",
    },
    {
      id: uuidv4(),
      imageUrl: "Mobile-Accessories-Fiesta-banner-D-1-Dec-rev-1.jpeg",
      path: "categories/mobile",
      displayName: "Mobile-Accessories-Fiesta-banner",
    }
  ];
  const BannerCarouselConfig = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  async function getDataForHomePage() {
    setIsLoading(true);
    try{
      const response = await fetch(GET_PRODUCTS_FOR_HOMEPAGE,{
        headers: {
          'projectID' : 'kbtsbbfdoig1',
        }
      });
      const jsonData = await response.json();
      setTrendingList(jsonData.data);
    }
    catch(error) {
      console.log("error", error);
    }
    finally{
      setIsLoading(false);
    }
  }
  async function getBestSellerList() {
    const response = await fetch(GET_BESTSELLER_LIST, {
      headers : {
        'projectID' : 'kbtsbbfdoig1',
      }
    });
    const jsonData = await response.json();
    setBestSellerList(jsonData.data);
    // console.log("best seller List: ", jsonData);
  }
  async function getNewArrivalList() {
    const response = await fetch(GET_NEW_ARRIVAL,{
      headers: {
        'projectID' : 'kbtsbbfdoig1',
      }
    });
    const jsonData = await response.json();
    setNewArrivalList(jsonData.data);
  }
  async function getProductCategoryWise(category,limit) {
    try{
      const response = await fetch(GET_PRODUCTS_CATEGORYWISE(category,limit), {
        headers: {
          'projectID' : 'kbtsbbfdoig1',
        }
      });
      const jsonData = await response.json();

      if(category === "tv") {
        setTvList(jsonData.data);
      }
      else if(category === "ac") {
        setAcList(jsonData.data);
      }
      else if(category === "refrigerator") {
        setFridgeList(jsonData.data);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  

  useEffect(()=>{
    getDataForHomePage();
    getBestSellerList();
    getNewArrivalList();
    getProductCategoryWise('tv', 10);
    getProductCategoryWise('ac', 10);
    getProductCategoryWise('refrigerator', 10);

    // TODO: Force scroll page to the top[not working]
    
    // window.onbeforeunload = () => {
      window.scrollTo(0,0);
    // }
  },[])
  return (
    <>
        {isLoading ? (
        <div className='loader'><Loader /></div>
        ) : 
        (<>
          <Carousel classes="banner-slider" sliderList={sliderList} config={BannerCarouselConfig}/>
          <HomeSection sliderList={trendingList} config={settings} categoryName={"Trending"}/>
          <HomeSection sliderList={bestSellerList} config={settings} categoryName={"Best Seller"} />
          <HomeSection sliderList={newArrivalList} config={settings} categoryName={"New Arrival"}/>
          <HomeSection sliderList={tvList} config={settings} categoryName={"Television"}/>
          <HomeSection sliderList={fridgeList} config={settings} categoryName={"Refrigerator"}/>
          <HomeSection sliderList={acList} config={settings} categoryName={"Air Conditioner"}/>
          </>
        )}
    </>
  )
}

export default Home;