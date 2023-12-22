import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_PRODUCT_DETAILS } from '../Constants/APIs';
import Breadcrumb from '../components/Breadcrumb/breadcrumb';
import Carousel from '../components/Carousel/carousel';

function ProductDetail() {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  async function getProductDetails(id) {
    try{
      const response = await fetch(GET_PRODUCT_DETAILS(id), {
        headers: {
          'projectID' : 'kbtsbbfdoig1',
        }
      });
      const jsonData = await response.json();
      setProductDetails(jsonData.data);
      console.log(jsonData);
    }
    catch(error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getProductDetails(product_id);
  },[])
  return (
    <div>
      <Breadcrumb />
      <div className='product-details'>
        <div className='product-images-display'>
          <img src={productDetails.displayImage} alt={productDetails.name} />
          <Carousel />
        </div>
        <div className='product-details-display'>
          <div className='product-details-title'>{productDetails.name}</div>
          <div>{productDetails.price}</div>
          
        </div>
      </div>
      <div className='product-description-review-section'>
        <div className='product-details-control-panel'>
          <ul>
            <li><a href='#description'>Description</a></li>
            <li><a href="#review">Customer Reviews</a></li>
          </ul>
        </div>
        <div id="description" className='product-description'>
          <div dangerouslySetInnerHTML={{
            __html: productDetails.description,
            }}>
          </div>
        </div>
        <div id="review" className='customer-reviews'>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail;