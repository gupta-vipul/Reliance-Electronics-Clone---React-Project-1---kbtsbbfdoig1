import React from "react";
import { Rating } from "@mui/material";
import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import { INRConversion } from "../../utils/NumberConversion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProductCard(props) {
  const navigate = useNavigate();
  const { product } = props;
  async function addProductToWishlist(id) {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
        {
          method: "PATCH",
          headers: {
            projectID: "kbtsbbfdoig1",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*", // no use same error persists
          },
          body: JSON.stringify({
            productId: id,
          }),
        }
      );
      const jsonData = await response.json();
      // CORS Error -
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  }
  function addToWishList(e, id) {
    e.stopPropagation();
    if (localStorage.getItem("token")) {
      addProductToWishlist(id);
    } else {
      navigate("/login");
    }
  }

  function showProductDetails(id) {
    window.open(`/product/${id}`, "_blank");
  }

  return (
    // <Link to={`/product/${product._id}`} target="_blank">
    <div className="card" onClick={() => showProductDetails(product._id)}>
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
        onClick={(e) => addToWishList(e, product._id)}
      >
        <FavoriteBorderIcon className="wishlist-heart" />
        <span>Wishlist</span>
      </div>
    </div>
    // </Link>
  );
}

export default ProductCard;
