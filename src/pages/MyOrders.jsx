import React, { useState } from 'react'

function MyOrders() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  return (
    <div className='order-history-page'>
        {
          purchasedProducts && purchasedProducts.length == 0 ? 
          (<div className='empty-order-page flex'>
            <div className='empty-order-img-text-container flex'>
              <img src="/no-item-found.png" alt="no orders found" />
              <p>No Orders Found</p>
            </div>
            <button className='empty-order-page-btn'>continue shopping</button>
          </div>) :
          (<div>some products</div>)
        }
    </div>
  )
}

export default MyOrders;