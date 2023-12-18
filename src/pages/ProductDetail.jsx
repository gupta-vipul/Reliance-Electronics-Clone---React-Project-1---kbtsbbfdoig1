import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_PRODUCT_DETAILS } from '../Constants/APIs';
import Breadcrumb from '../components/Breadcrumb/breadcrumb';

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
      <img src={productDetails.displayImage} alt={productDetails.name} />
      <div>{productDetails.name}</div>
      <div>{productDetails.price}</div>
      <div>{productDetails.description}</div>
    </div>
  )
}

export default ProductDetail;