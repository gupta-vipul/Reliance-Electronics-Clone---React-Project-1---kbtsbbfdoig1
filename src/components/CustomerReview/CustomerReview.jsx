import React, { useState } from "react";
import "./CustomerReview.css";
import { Rating } from "@mui/material";

function CustomerReview(props) {
  const { productDetails, productReviews } = props;
  return (
    <div id="review" className="customer-reviews">
      <span className="customer-review-tag">customer reviews</span>
      <span className="review-product-name">({productDetails.name})</span>
      {productReviews &&
        Array.isArray(productReviews) &&
        productReviews.map((review) => {
          return (
            <div key={review._id} className="review-card">
              <div className="review-user-name">Reliance Digital-user</div>
              <Rating name="review-rating" value={review.ratings} readOnly />
              <div className="review-comment">{review.text}</div>
              <button className={`helpful-btn`}>helpful</button>
            </div>
          );
        })}
    </div>
  );
}

export default CustomerReview;
