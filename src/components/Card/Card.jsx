import React from "react";
import { Rating } from "@mui/material";
import "./Card.css";
import { INRConversion } from "../../utils/NumberConversion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProductCard(props) {
  const { product, handleProductCardClick, handleProductWishlistBtn } = props;
  return (
    <div className="card" onClick={() => handleProductCardClick(product._id)}>
      <div className="img-container">
        <img
          src={product.displayImage}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = "/img_404.svg";
          }}
        />
      </div>
      <div className="product-title">{product.name}</div>
      <div className="product-ratings">
        <Rating
          name="read-only"
          value={product.ratings}
          style={{ fontSize: "16px" }}
          readOnly
        />
        <span>({product.ratings.toFixed(1)})</span>
      </div>
      <div className="product-price">{INRConversion(product.price)}</div>
      <div
        className="wishlist-btn"
        onClick={(e) => handleProductWishlistBtn(e, product._id)}
      >
        <FavoriteBorderIcon className="wishlist-heart" />
        <span>Wishlist</span>
      </div>
    </div>
  );
}

export default ProductCard;
