import React from 'react'
import { Link } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';


function MyAccount() {
    const accountPagecardData = [
        {
            _id: uuidv4(),
            cardHeading: 'My Order',
            image: '/my-orders.webp',
            path: '/profile/myorders',
            cardText: 'Track your order and history',
        },
        {
            _id: uuidv4(),
            cardHeading: 'My Wishlist',
            image: '/my-wishlist.webp',
            path: '/profile/mywishlist',
            cardText: 'Create, Edit your custom wishlist',
        }
    ];
  return (
    <div className='myaccount-page flex'>
        {
            accountPagecardData.map((item)=>{
                return (
                    <Link to={item.path} className='myaccount-card flex' key={item._id}>
                        <div className="flex myaccount">
                            <div className='myaccount-card-head'>{item.cardHeading}</div>
                            <p className='myaccount-card-text'>{item.cardText}</p>
                        </div>
                        <div className='myaccount-card-img-container flex'>
                            <img src={item.image} alt={item.cardHeading} />
                        </div>
                    </Link>
                )
            })
        } 
    </div>
  )
}

export default MyAccount


{/* <span>My Order</span> */}
                // <p></p>
                // <span>My Wishlist</span>
                // <p>Create, Edit your custom wishlist</p>