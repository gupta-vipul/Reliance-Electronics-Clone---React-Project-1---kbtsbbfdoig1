import React from 'react';
import { Card, CardMedia, Rating } from '@mui/material';
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
          <img src={product.displayImage} alt={product.name} />
        </div>
        <div className='product-title'>{product.name}</div>
        <div className='product-ratings'><Rating name="read-only" value={product.ratings} style={{fontSize: '18px'}}/><span>({product.ratings.toFixed(1)})</span></div>
        <div className='product-price'>{INRConversion(product.price)}</div>
        <div className='wishlist-btn'><FavoriteBorderIcon className='wishlist-heart'/><span>Wishlist</span></div>
      </div>
    </Link>
  )
}

export default ProductCard;