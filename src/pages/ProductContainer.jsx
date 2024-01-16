import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GET_PRODUCTS_CATEGORYWISE,
  GET_SEARCH_DATA,
  GET_SELLERTAG_PRODUCT,
} from "../Constants/APIs";
import ProductCard from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import Breadcrumb from "../components/Breadcrumb/breadcrumb";
import { Clear } from "@mui/icons-material";
import Toast from "../components/Toast/Toast";

function ProductContainer() {
  const { productCategory, userInput, itemsCategories } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [brandKey, setBrandKey] = useState("");
  async function getAllProductsCategoryWise(category) {
    setIsLoading(true);
    try {
      const response = await fetch(GET_PRODUCTS_CATEGORYWISE(category), {
        headers: {
          projectID: "kbtsbbfdoig1",
        },
      });
      const jsonData = await response.json();
      setProducts(jsonData.data);
      const updatedBrand = [
        ...new Set(
          jsonData.data.map((item) => {
            if (item.brand) {
              return item.brand;
            }
          })
        ),
      ];
      setBrands(updatedBrand);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getSearchResult(userInput) {
    setIsLoading(true);
    try {
      const response = await fetch(GET_SEARCH_DATA(userInput), {
        headers: {
          projectID: "kbtsbbfdoig1",
        },
      });
      const jsonData = await response.json();
      if (jsonData.status === "success") {
        setProducts(jsonData.data);
        const updatedBrand = [
          ...new Set(
            jsonData.data.map((item) => {
              if (item.brand) {
                return item.brand;
              }
            })
          ),
        ];
        setBrands(updatedBrand);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getSliderProducts(category) {
    setIsLoading(true);
    try {
      const response = await fetch(GET_SELLERTAG_PRODUCT(category), {
        headers: {
          projectID: "kbtsbbfdoig1",
        },
      });
      const jsonData = await response.json();
      setProducts(jsonData.data);
      const updatedBrand = [
        ...new Set(
          jsonData.data.map((item) => {
            if (item.brand) {
              return item.brand;
            }
          })
        ),
      ];
      setBrands(updatedBrand);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getFilteredProduct(brand, category) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${category}", "brand":"${brand}"}`,
        {
          headers: {
            projectID: "kbtsbbfdoig1",
          },
        }
      );
      const jsonData = await response.json();
      setProducts(jsonData.data);
      setBrandKey(brand);
      const updatedBrand = [
        ...new Set(
          jsonData.data.map((item) => {
            if (item.brand) {
              return item.brand;
            }
          })
        ),
      ];
      setBrands(updatedBrand);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getSearchedFilterProducts(brand, userInput) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${userInput}"}&filter={"brand":"${brand}"}`,
        {
          headers: {
            projectID: "kbtsbbfdoig1",
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.status === "success") {
        setProducts(jsonData.data);
        setBrandKey(brand);
        const updatedBrand = [
          ...new Set(
            jsonData.data.map((item) => {
              if (item.brand) {
                return item.brand;
              }
            })
          ),
        ];
        setBrands(updatedBrand);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSnackbarClose(e, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  function handlecheckboxClick(e) {
    if (productCategory) {
      getFilteredProduct(e.target.value, productCategory);
    } else if (userInput) {
      getSearchedFilterProducts(e.target.value, userInput);
    } else if (itemsCategories) {
      // console.log("HomePage data");
    }
  }
  // Sorting function
  function SortingLowToHigh() {
    //   if(productCategory) {
    //   }
    //   else if(userInput) {
    //     console.log('userInput');
    //   }
    //   else if(itemsCategories) {
    //     console.log('HomePage data');
    //   }
  }
  function SortingHighToLow() {
    //   console.log('price High - low ')
  }

  function handleFilterClearBtn() {
    setBrandKey("");
    if (productCategory) {
      getAllProductsCategoryWise(productCategory);
    } else if (userInput) {
      getSearchResult(userInput);
    }
  }

  useEffect(() => {
    if (productCategory) {
      getAllProductsCategoryWise(productCategory);
    } else if (userInput) {
      getSearchResult(userInput);
    } else if (
      itemsCategories === "trending" ||
      itemsCategories === "best seller" ||
      itemsCategories === "new arrival"
    ) {
      getSliderProducts(itemsCategories);
    } else if (
      itemsCategories === "tv" ||
      itemsCategories === "ac" ||
      itemsCategories === "refrigerator"
    ) {
      getAllProductsCategoryWise(itemsCategories);
    }
    window.scrollTo(0, 0);
  }, [productCategory, userInput, itemsCategories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <Breadcrumb />
          {products.length == 0 ? (
            <div className="product-not-found-container flex">
              <div className="product-not-found-image">
                <img src="/product_not_found.png" alt="product-not-found" />
              </div>
              <p>No Result Found, Please try other search.</p>
            </div>
          ) : (
            <div className="product-listing">
              <div className="filter-section">
                <div className="static-filter-tag">
                  <h3>FILTERS</h3>
                </div>
                <div className="brand-filter">
                  <div className="brand-filter-header">
                    <h4>Brand</h4>
                  </div>
                  {brands &&
                    brands.map((brand, index) => {
                      return (
                        <label className="brand-label-container" key={index}>
                          {brand}
                          <input
                            type="checkbox"
                            value={brand}
                            onClick={handlecheckboxClick}
                          />
                          <span className="brand-checkmark"></span>
                        </label>
                      );
                    })}
                </div>
              </div>
              <div className="sorting-section">
                <div className="sorting-section-panel">
                  <div className="panel-caption">{productCategory}</div>
                  <div className="control-panel">
                    <span>Sort By:</span>
                    <div className="sorting-btn">Relevance</div>
                    <div className="sorting-btn" onClick={SortingLowToHigh}>
                      Price(Low-High)
                    </div>
                    <div className="sorting-btn" onClick={SortingHighToLow}>
                      Price(High-Low)
                    </div>
                  </div>
                </div>
                {/* TODO: Work on the applied filters section */}
                <div
                  className={`applied-filter-section ${
                    brandKey ? "" : "afs-display-none"
                  }`}
                >
                  <span className="applied-filter-tag text-capitalise">
                    filters:
                  </span>
                  <div className="flex filter-tag">
                    {brandKey}
                    <Clear
                      sx={{
                        fontSize: "16px",
                        paddingLeft: "5px",
                        cursor: "pointer",
                      }}
                      onClick={handleFilterClearBtn}
                    />
                  </div>
                </div>
                <div className="productContainer">
                  {products &&
                    Array.isArray(products) &&
                    products.map((product) => {
                      return (
                        <ProductCard key={product._id} product={product} />
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Toast
        open={open}
        duration={5000}
        onClose={handleSnackbarClose}
        severity={severity}
        message={message}
      />
    </>
  );
}

export default ProductContainer;
