import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCTS_CATEGORYWISE } from "../Constants/APIs";
import ProductCard from "../components/Card/Card";

import { SearchContext } from "../Context/SearchContext";
import Breadcrumb from "../components/Breadcrumb/breadcrumb";

function ProductContainer() {
  const { productCategory } = useParams();
  const { searchInputText } = useContext(SearchContext);
  // console.log(searchInputText);
  const [products, setProducts] = useState([]);

  async function getAllProductsCategoryWise(category) {
    const response = await fetch(GET_PRODUCTS_CATEGORYWISE(category), {
      headers: {
        projectID: "kbtsbbfdoig1",
      },
    });
    const jsonData = await response.json();
    setProducts(jsonData.data);
    // console.log(jsonData.data);
  }

  useEffect(() => {
    getAllProductsCategoryWise(productCategory);
  }, [productCategory]);
  return (
    <>
      <Breadcrumb />
      <div className="product-listing">
        <div className="filter-section">
          <div className="static-filter-tag">
            <h3>FILTERS</h3>
          </div>
          <div className="brand-filter">
            <div className="brand-filter-header">
            <h4>Brand</h4>
            <div>search</div>  
            </div>
            <label>
              <input type="checkbox" />
              brand A
            </label>
            <label>
              <input type="checkbox" />
              brand B
            </label>
            <label>
              <input type="checkbox" />
              brand C
            </label>
          </div>
        </div>
        <div className="sorting-section">
          <div className="sorting-section-panel">
            <div className="panel-caption">{productCategory}</div>
            <div className="control-panel">
              <span>Sort By:</span>
              <div>Price(Low-High)</div>
              <div>Price(High-Low)</div>
            </div>
          </div>  
          <div className="productContainer">
            {products &&
              Array.isArray(products) &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
            }
          </div>    
        </div>  
      </div>
    </>
  );
}

export default ProductContainer;
