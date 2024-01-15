import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyOrders() {
  const navigate = useNavigate();
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  function handleEmptyOrderPageBtnClick() {
    navigate("/");
  }
  return (
    <div className='order-history-page'>
        {
          purchasedProducts && purchasedProducts.length == 0 ? 
          (<div className='empty-order-page flex'>
            <div className='empty-order-img-text-container flex'>
              <img src="/no-item-found.png" alt="no orders found" />
              <p>No Orders Found</p>
            </div>
            <button className='empty-order-page-btn' onClick={handleEmptyOrderPageBtnClick}>continue shopping</button>
          </div>) :
          (<div>some products</div>)
        }
    </div>
  )
}

export default MyOrders;