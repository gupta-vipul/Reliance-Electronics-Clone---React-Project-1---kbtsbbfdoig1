import React from "react";
import { Rating } from "@mui/material";
import "./SliderCard.css";
import { Link } from "react-router-dom";
import { INRConversion } from "../../utils/NumberConversion";

function SliderCard(props) {
  const { product } = props;
  return (
    <Link to={`/product/${product._id}`} target="_blank">
      <div className="slider-card">
        <div className="slider-img-container">
          <img
            src={product.displayImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = "/img_404.svg";
            }}
          />
        </div>
        <div className="slider-product-title">{product.name}</div>
        <div className="slider-product-ratings">
          <Rating
            name="read-only"
            value={product.ratings}
            style={{ fontSize: "16px" }}
            readOnly
          />
          <span>({product.ratings.toFixed(1)})</span>
        </div>
        <div className="slider-product-price">
          <span className="slider-price-tag">M.R.P: </span>
          {INRConversion(product.price)}
        </div>
      </div>
    </Link>
  );
}

export default SliderCard;
