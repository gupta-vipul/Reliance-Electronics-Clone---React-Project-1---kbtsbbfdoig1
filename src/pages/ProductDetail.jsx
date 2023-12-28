import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PRODUCT_DETAILS, PATCH_ITEM_TO_CART, PRODUCT_REVIEW } from '../Constants/APIs';
import Breadcrumb from '../components/Breadcrumb/breadcrumb';
import Carousel from '../components/Carousel/carousel';
import { INRConversion } from '../utils/NumberConversion';
import { Button, Rating } from '@mui/material';
import Loader from '../components/Loader/Loader';
import { CartContext } from '../Context/CartContext';

function ProductDetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const {setCartCount} = useContext(CartContext);
  const [productDetails, setProductDetails] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function getProductDetails(id) {
    setIsLoading(true);
    try{
      const response = await fetch(GET_PRODUCT_DETAILS(id), {
        headers: {
          'projectID' : 'kbtsbbfdoig1',
        }
      });
      const jsonData = await response.json();
      setProductDetails(jsonData.data);
      // console.log(jsonData);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }
  async function getProductReviews(id) {
    try{
      const response = await fetch(PRODUCT_REVIEW(id), {
        headers: {
          'projectID' : 'kbtsbbfdoig1',
        }
      });
      const jsonData = await response.json();
      setProductReviews(jsonData.data);
      // console.log(jsonData);
    }
    catch(error) {
      console.log(error);
    }
  }
  async function addProductToCart(id) {
    setBtnLoader(true);
    try {
      const response = await fetch(PATCH_ITEM_TO_CART(id), {
        method: 'PATCH',
        headers: {
          'projectID' : 'kbtsbbfdoig1',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          'quantity' : 1,
        })
      });
      const jsonData = await response.json();
      setBtnLoader(false);
      setCartCount(jsonData.results);
      navigate("/cart")
    }
    catch(error) {
      console.log(error);
      setBtnLoader(false);

    } 
    
  }
  function addtoCart(id) {
    if(localStorage.getItem('token')) {
      addProductToCart(id);
    }
    else {
      navigate('/login')
    }
  }
  function handleBuyNowBtnClick() {
    console.log("button buy now clicked");
    navigate('/checkout');
  }
  useEffect(()=>{
    getProductDetails(product_id);
    getProductReviews(product_id);
  },[])
  return (
    <>{isLoading ? 
      (<div className='loader'><Loader /></div>) :
      (<div>
      <Breadcrumb />
      <div className='product-details'>
        <div className='product-images-display'>
          <img src={productDetails.displayImage} alt={productDetails.name} />
          <Carousel />
        </div>
        <div className='product-details-display'>
          <div className='product-details-title-rating'>
            <span className='product-details-title'>{productDetails.name}</span>
            
            </div>
          <div className="product-features-price-section">
            <div className='product-features-offer-section'>
              <span className="product-featureslist-tag">key features</span>
              <div className='product-featureslist'>
                <ul>
                  {
                    productDetails.features && 
                    Array.isArray(productDetails.features) &&
                    productDetails.features.map((feature, index)=>{
                      return (
                        <li key={index}>{feature}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className='product-addtocart-price-section'>
              <div className='product-details-price'>
                MRP: <span>{INRConversion(productDetails.price)}</span>
              </div>
              <div className='product-details-btn'>
                <Button size='large' sx={{backgroundColor: "var(--primary-color)", color: '#fff'}} onClick={()=>addtoCart(product_id)} fullWidth>add to cart</Button>
                <Button size="large" sx={{backgroundColor: "orangered", color: '#fff'}} onClick={handleBuyNowBtnClick}fullWidth>buy now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='product-description-review-section'>
        <div className='product-more-details-panel container'>
          <ul className='product-details-panel-list'>
            <li><a href='#description'>Description</a></li>
            <li><a href="#review">Customer Reviews</a></li>
          </ul>
        </div>
        <div id="description" className='product-description container'>
          <div dangerouslySetInnerHTML={{
            __html: productDetails.description,
            }}>
          </div>
        </div>
        <div id="review" className='customer-reviews container'>
          <span>customer reviews</span>
          <span>({productDetails.name})</span>
            {
              productReviews && 
              Array.isArray(productReviews) &&
              productReviews.map((review)=>{
                return (
                  <div key={review._id}>{review.text}</div>
                )
              })
            }
        </div>
      </div>
      </div>
      )}
    </>
  )
}

export default ProductDetail;