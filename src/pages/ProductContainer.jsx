import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_PRODUCTS_CATEGORYWISE } from '../Constants/APIs';
import ProductCard from '../components/Card/Card';

function ProductContainer() {
  const {productCategory} = useParams();
  const [products, setProducts] = useState([]);
  
  async function getAllProductsCategoryWise(category) {
    const response = await fetch(GET_PRODUCTS_CATEGORYWISE(category), {
      headers: {
        'projectID' : 'kbtsbbfdoig1',
      }
    });
    const jsonData = await response.json();
    setProducts(jsonData.data);
    console.log(jsonData.data);
  }

  useEffect(()=>{
    getAllProductsCategoryWise(productCategory);
  },[productCategory])
  return (
    <div className='productContainer'>
      {
        products && 
        Array.isArray(products) && 
        products.map((product)=>{
          return (
            <ProductCard key={product._id} product = {product} />
          )
        })
      }
    </div>
  )
}

export default ProductContainer;