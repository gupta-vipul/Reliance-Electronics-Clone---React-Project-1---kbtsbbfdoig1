import React from 'react';
import { Card, CardHeader, CardMedia } from '@mui/material';
import './Card.css';


function ProductCard(props) {
    const {product} = props;
  return (
    <div className='product-card'>
        <Card>
          <div className='card-image'>
            <CardMedia
              component="img"
              height="50%"
              width="100%"
              image={product.displayImage}
              alt={product.name}
            />
          </div>
          <div className='product-title'>{product.name}</div>
          <div className='product-price'>{product.price}</div>
          <span className="product-rating">{product.ratings}</span>
        </Card>
    </div>
  )
}

export default ProductCard;