import React from 'react'
import './CartCard.css'
import { Link } from 'react-router-dom';

function CartCard(props) {
    const {item, removeProduct} = props;
    
  return (
    <div className='cart-card'>
        <div className='cart-product-details'>    
            <div className='cart-img-container'>
                <Link to={`/product/${item.product._id}`}><img 
                    className='cart-image'
                    src={item.product.displayImage} 
                    alt={item.product.name} 
                    onError={(e)=>{
                        e.currentTarget.src = "/placeholder.png"
                    }} 
                /></Link>
            </div>
            <div className='cart-product-title-review'>
                <Link to={`/product/${item.product._id}`}><div className='cart-product-title'>{item.product.name}</div></Link>
            </div>
            <div className='cart-product-price'>₹{(item.product.price).toLocaleString("en-IN")}</div>
        </div>
        <div className='cart-item-qty-container'>
            <div>Qty: </div>
            <div>{item.quantity}</div>
        </div>
        <div className='cart-item-control'>
            <button className='cart-item-remove-btn' onClick={removeProduct}>remove</button>
            <button className='cart-item-wishlist-btn'>move to wishlist</button>
        </div>
    </div>
  )
}

export default CartCard;