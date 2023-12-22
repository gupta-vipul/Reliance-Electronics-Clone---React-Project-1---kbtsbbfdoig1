import React from 'react';
import { Rating } from '@mui/material';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { INRConversion } from '../../utils/NumberConversion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function ProductCard(props) {
  const navigate = useNavigate();
  const {product} = props;
  return (
    <Link to={`/product/${product._id}`} target="_blank">
      <div className='card'>
        <div className='img-container'>
          <img src={product.displayImage} alt={product.name} onError={(e)=>{
            e.currentTarget.src = "/placeholder.png"
          }}/>
        </div>
        <div className='product-title'>{product.name}</div>
        <div className='product-ratings'><Rating name="read-only" value={product.ratings} style={{fontSize: '16px'}} readOnly /><span>({product.ratings.toFixed(1)})</span></div>
        <div className='product-price'>{INRConversion(product.price)}</div>
        <div className='wishlist-btn'><FavoriteBorderIcon className='wishlist-heart'/><span>Wishlist</span></div>
      </div>
    </Link>
  )
}

export default ProductCard;