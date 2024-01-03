import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCTS_CATEGORYWISE, GET_SEARCH_DATA, GET_SELLERTAG_PRODUCT } from "../Constants/APIs";
import ProductCard from "../components/Card/Card";
import Loader from '../components/Loader/Loader';
import Breadcrumb from "../components/Breadcrumb/breadcrumb";
import { Clear } from "@mui/icons-material";

function ProductContainer() {
  const { productCategory, userInput, itemsCategories } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  async function getAllProductsCategoryWise(category) {
    setIsLoading(true);
    try{
      const response = await fetch(GET_PRODUCTS_CATEGORYWISE(category), {
      headers: {
        projectID: "kbtsbbfdoig1",
      },
      });
      const jsonData = await response.json();
      setProducts(jsonData.data);
      const updatedBrand = [...(new Set(jsonData.data.map((item)=>{
        if(item.brand) {
          return item.brand;
        }
      })))];
      setBrands(updatedBrand);
    }
    catch(error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  }
  async function getSearchResult(userInput) {
    setIsLoading(true);
    try{
      const response = await fetch(GET_SEARCH_DATA(userInput), {
      headers: {
        'projectID' : 'kbtsbbfdoig1',
      }
      });
      const jsonData = await response.json();
      setProducts(jsonData.data);
      const updatedBrand = [...(new Set(jsonData.data.map((item)=>{
        if(item.brand) {
          return item.brand;
        }
      })))];
      setBrands(updatedBrand);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }
  async function getSliderProducts(category) {
    setIsLoading(true);
    try{
      const response = await fetch(GET_SELLERTAG_PRODUCT(category), {
      headers: {
        'projectID' : 'kbtsbbfdoig1',
      }
      });
      const jsonData = await response.json();
      setProducts(jsonData.data);
      const updatedBrand = [...(new Set(jsonData.data.map((item)=>{
        if(item.brand) {
          return item.brand;
        }
      })))];
      setBrands(updatedBrand);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  function handlecheckboxClick(e) {
    
  }

  useEffect(() => {
    if(productCategory) {
      getAllProductsCategoryWise(productCategory);
    }
    else if(userInput) {
      getSearchResult(userInput);
    }
    else if(itemsCategories === 'trending' || itemsCategories === 'best seller' || itemsCategories === 'new arrival') {
      getSliderProducts(itemsCategories);
    }
    else if(itemsCategories === 'tv' || itemsCategories === 'ac' || itemsCategories === 'refrigerator') {
      getAllProductsCategoryWise(itemsCategories);
    }
    window.scrollTo(0, 0);
    }, [productCategory, userInput, itemsCategories]);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>{isLoading ? (<div className="loader"><Loader /></div>) :
      (<>
        <Breadcrumb />
        <div className="product-listing">
          <div className="filter-section">
            <div className="static-filter-tag">
              <h3>FILTERS</h3>
            </div>
            <div className="brand-filter">
              <div className="brand-filter-header">
              <h4>Brand</h4>
              </div>
              {
                brands &&
                brands.map((brand,index)=>{
                  return (
                    <label className="brand-label-container" key={index}>
                        {brand}
                      <input type="checkbox" value={brand} onClick={handlecheckboxClick} />
                      <span className="brand-checkmark"></span>
                    </label>  
                  )
                })
              }
            </div>
          </div>
          <div className="sorting-section">
            <div className="sorting-section-panel">
              <div className="panel-caption">{productCategory}</div>
              <div className="control-panel">
                <span>Sort By:</span>
                <div className="sorting-btn">Price(Low-High)</div>
                <div className="sorting-btn">Price(High-Low)</div>
              </div>
            </div>
            <div className="applied-filter-section">
              <span className="applied-filter-tag text-capitalise">filters:</span>
              <div className="flex filter-tag">Sony<Clear sx={{fontSize: '16px', paddingLeft: '5px', cursor: 'pointer'}}/></div>
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
      </>)}
    </>
  );
}

export default ProductContainer;
