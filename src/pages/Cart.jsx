import React, { useContext, useEffect, useState } from 'react'
import { GET_CART_ITEMS, REMOVE_ITEM_FROM_CART } from '../Constants/APIs';
import { Link, useNavigate } from 'react-router-dom';
import CartCard from '../components/CartCard/CartCard';
import IsAuth from '../components/IsAuth/IsAuth';
import Loader from '../components/Loader/Loader';
import { CartContext } from '../Context/CartContext';

function Cart() {
  const [cartItems, setCartItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {cartCount,setCartCount} = useContext(CartContext);
  const navigate = useNavigate();
  async function getCartItems() {
    setIsLoading(true);
    try{
      const response = await fetch(GET_CART_ITEMS, {
      headers: {
        'projectID' : 'kbtsbbfdoig1',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
      });
      const jsonData = await response.json();
      setCartItems(jsonData.data);
      setCartCount(jsonData.results);
      // console.log(jsonData);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }
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
      getCartItems();
      setCartItems(jsonData.data);
    }
    catch(error) {
      console.log(error);
    } 
  }
  
  function checkout() {
    navigate('/checkout');
  }
  useEffect(()=>{
    getCartItems();
  },[])

  return (
    <div className='cart'>
      {
        isLoading ? (
          <div className='cart-loader'>
            <Loader />
          </div>
        ) :
        (cartItems.items == 0 ? (
          <div className='empty-cart-container'>
            <img src="/emptycart.png" alt="empty-cart" />
            <p className='empty-cart-text'>your shopping cart is empty</p>
            <Link to="/"><button className='empty-cart-button'>continue shopping</button></Link>
          </div>
        ) : (
          <div className='cart-container'>
            <div className='cart-product-listing'>
              <div className='cart-bar'>
                <div className='text-capitalise'>my cart ({`${cartItems?.items?.length} items`})</div>
                <div className='text-capitalise'>shipping to: pincode</div>
              </div>
              {
                cartItems.items && 
                Array.isArray(cartItems.items) && 
                cartItems.items.map((cartListItem)=>{
                  return (
                    <CartCard item={cartListItem} key={cartListItem._id} removeProduct={()=>removeProduct(cartListItem.product._id)}/>
                  )
                })
              }
            </div>
            <div className='checkout-form'>
              <button onClick={checkout} className='cart-checkout-btn'>checkout</button>
              <div className="checkout-total-summary">
                <h3 className='checkout-form-heading'>price details</h3>
                <div className='cart-total-price'>
                  <span className='text-capitalise'>price({`${cartItems?.items?.length} items`})</span>
                  <span className='price-without-discount'>₹{cartItems.totalPrice && (cartItems?.totalPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className='cart-delivery-charges'> 
                  <span className='text-capitalise'>delivery charges</span>
                  <span className='deilvery-price-tag'>free</span>
                </div>
                <div className='cart-total-discounted-price'>
                  <span className='amt-payable-tag'>amount payable</span>
                  <span className='payable-amt'>₹{cartItems.totalPrice && (cartItems?.totalPrice).toLocaleString("en-IN")}</span>
                </div>
                <div className='checkout-static-message'>Safe and Secure Payments. Easy returns. 100% Authentic products.</div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default IsAuth(Cart);