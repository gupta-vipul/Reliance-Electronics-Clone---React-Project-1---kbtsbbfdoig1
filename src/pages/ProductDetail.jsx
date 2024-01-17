import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_PRODUCT_DETAILS,
  PATCH_ITEM_TO_CART,
  PRODUCT_REVIEW,
} from "../Constants/APIs";
import Breadcrumb from "../components/Breadcrumb/breadcrumb";
import { INRConversion } from "../utils/NumberConversion";
import { Button, Rating } from "@mui/material";
import Loader from "../components/Loader/Loader";
import { CartContext } from "../Context/CartContext";
import CustomerReview from "../components/CustomerReview/CustomerReview";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Toast from "../components/Toast/Toast";

function ProductDetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);
  const [productDetails, setProductDetails] = useState({});
  const [displayImage, setdisplayImage] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  // console.log(productDetails);
  async function getProductDetails(id) {
    setIsLoading(true);
    try {
      const response = await fetch(GET_PRODUCT_DETAILS(id), {
        headers: {
          projectID: "kbtsbbfdoig1",
        },
      });
      const jsonData = await response.json();
      setProductDetails(jsonData.data);
      setdisplayImage(jsonData.data.displayImage);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getProductReviews(id) {
    try {
      const response = await fetch(PRODUCT_REVIEW(id), {
        headers: {
          projectID: "kbtsbbfdoig1",
        },
      });
      const jsonData = await response.json();
      setProductReviews(jsonData.data);
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }
  async function addProductToCart(id) {
    setBtnLoader(true);
    try {
      const response = await fetch(PATCH_ITEM_TO_CART(id), {
        method: "PATCH",
        headers: {
          projectID: "kbtsbbfdoig1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          quantity: 1,
        }),
      });
      const jsonData = await response.json();
      setBtnLoader(false);
      setCartCount(jsonData.results);
      navigate("/cart");
    } catch (error) {
      console.log(error);
      setBtnLoader(false);
    }
  }
  function addtoCart(id) {
    if (localStorage.getItem("token")) {
      addProductToCart(id);
    } else {
      navigate("/login");
    }
  }
  function handleBuyNowBtnClick(id) {
    addtoCart(id);
  }

  function handleImageChange(url) {
    setdisplayImage(url);
  }
  useEffect(() => {
    getProductDetails(product_id);
    getProductReviews(product_id);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div>
          <Breadcrumb />
          <div className="product-details">
            <div className="product-images-display">
              <div className="displayImage-container">
                <img
                  src={displayImage && displayImage}
                  alt={productDetails.name}
                  onError={(e) => {
                    e.currentTarget.src = "/img_404.svg";
                  }}
                />
              </div>
              {/* TODO: Need to work on the Image Slider */}
              <div className="product-images-slider">
                <ImageSlider
                  imageList={productDetails.images}
                  handleClick={handleImageChange}
                />
              </div>
            </div>
            <div className="product-details-display">
              <div className="product-details-title-rating flex">
                <span className="product-details-title">
                  {productDetails.name}
                </span>
                <div
                  className="flex"
                  style={{
                    alignItems: "center",
                    color: "var(--secondary-color)",
                    fontWeight: "550",
                    fontSize: "0.8rem",
                  }}
                >
                  <Rating
                    sx={{ fontSize: "1.1rem" }}
                    name="review-rating"
                    value={productDetails.ratings}
                    readOnly
                  />
                  <span>({`${productReviews.length} Reviews`})</span>
                </div>
              </div>
              <div className="product-features-price-section">
                {productDetails.features &&
                productDetails.features.length === 0 ? null : (
                  <div className="product-features-offer-section">
                    <span className="product-featureslist-tag">
                      key features
                    </span>
                    <div className="product-featureslist">
                      <ul>
                        {productDetails.features &&
                          Array.isArray(productDetails.features) &&
                          productDetails.features.map((feature, index) => {
                            return <li key={index}>{feature}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="product-addtocart-price-section">
                  <div className="product-details-price">
                    MRP: <span>{INRConversion(productDetails.price)}</span>
                  </div>
                  <div className="product-details-btn">
                    <Button
                      size="large"
                      sx={{
                        backgroundColor: "var(--primary-color)",
                        color: "#fff",
                      }}
                      onClick={() => addtoCart(product_id)}
                      fullWidth
                    >
                      add to cart
                    </Button>
                    <Button
                      size="large"
                      sx={{ backgroundColor: "orangered", color: "#fff" }}
                      onClick={() => handleBuyNowBtnClick(product_id)}
                      fullWidth
                    >
                      buy now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-description-review-section">
            <div className="product-more-details-panel">
              <ul className="product-details-panel-list">
                <li>
                  <a href="#description">Description</a>
                </li>
                <li>
                  <a href="#review">Customer Reviews</a>
                </li>
              </ul>
            </div>
            <div id="description" className="product-description">
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails.description,
                }}
              ></div>
            </div>
            <CustomerReview
              productDetails={productDetails}
              productReviews={productReviews}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
