import React, { useEffect, useState } from "react";
import {
  GET_WISHLIST_DATA,
  REMOVE_PRODUCT_FROM_WISHLIST,
} from "../Constants/APIs";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function MyWishlist() {
  const navigate = useNavigate();
  const [wishlistedProduct, setWishllistedProducts] = useState([]);
  // API CALL FOR GETTING EXISTING PRODUCT IN WISHLIST
  async function getWishlistData() {
    try {
      const response = await fetch(GET_WISHLIST_DATA, {
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setWishllistedProducts(jsonData.data.items);
    } catch (error) {
      console.log(error);
    }
  }
  // CALL FOR REMOVING SINGLE PRODUCT FROM THE WISHLIST
  async function removeProductFromWishlist(id) {
    try {
      const response = await fetch(REMOVE_PRODUCT_FROM_WISHLIST(id), {
        method: "DELETE",
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setWishllistedProducts(jsonData.data.items);
    } catch (error) {
      console.log(error);
    }
  }
  function handleWishlistDeleteBtn(e, id) {
    e.stopPropagation();
    removeProductFromWishlist(id);
  }
  function handleWishlistCardClick(e, id) {}
  function handleEmptyPageButton() {
    navigate("/");
  }
  useEffect(() => {
    getWishlistData();
  }, []);
  return (
    <div className="wishlist-page flex">
      {wishlistedProduct && wishlistedProduct.length == 0 ? (
        <div className="empty-wishlist-page flex">
          <div className="empty-wishlist-text">Your Wishlist Currently has no Products</div>
          <button className='empty-wishlist-btn' onClick={handleEmptyPageButton}>continue shopping</button>
        </div>
      ) : (
        <>
          {wishlistedProduct &&
            Array.isArray(wishlistedProduct) &&
            wishlistedProduct.map((product) => {
              return (
                <div
                  className="wishlist-card"
                  key={product.products._id}
                  onClick={(e) =>
                    handleWishlistCardClick(e, product.products._id)
                  }
                >
                  <div className="wishlist-card-img-container">
                    <img
                      src={product.products.displayImage}
                      alt={product.products.name}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  </div>
                  <div className="wishlist-card-product-title">
                    {product.products.name}
                  </div>
                  <div className="wishlist-card-product-price">
                    ₹{product.products.price.toLocaleString("en-IN")}
                  </div>
                  <div className="wishlist-card-btn-container">
                    <button
                      className="wislist-delete-btn flex"
                      onClick={(e) =>
                        handleWishlistDeleteBtn(e, product.products._id)
                      }
                    >
                      <Delete sx={{ fontSize: "18px", color: "#2e80fc" }} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default MyWishlist;
