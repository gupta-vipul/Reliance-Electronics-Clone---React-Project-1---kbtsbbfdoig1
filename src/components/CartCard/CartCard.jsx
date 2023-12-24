import React, { useContext } from 'react'
import './CartCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { REMOVE_ITEM_FROM_CART } from '../../Constants/APIs';
import { CartContext } from '../../Context/CartContext';

function CartCard(props) {
    const {item} = props;
    const navigate = useNavigate();
    const {cartCount, setCartCount} = useContext(CartContext);
    async function removeProduct(id) {
        try{
            const response = await fetch(REMOVE_ITEM_FROM_CART(id), {
            method: 'DELETE',
            headers: {
              'projectID' : 'kbtsbbfdoig1',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
            });
            const jsonData = await response.json();
            console.log(jsonData);
            if(cartCount >= 1){
                setCartCount(prev => prev - 1);
            }
        }
        catch(error) {
            console.log(error);
        } 
    }
    function handleClick(id) {
        removeProduct(id);
    }
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
            <button className='cart-item-remove-btn' onClick={()=>handleClick(item.product._id)}>remove</button>
            <button className='cart-item-wishlist-btn'>move to wishlist</button>
        </div>
    </div>
  )
}

export default CartCard;