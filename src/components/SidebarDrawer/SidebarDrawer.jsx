import React from "react";
import "./SidebarDrawer.css";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function SidebarDrawer(props) {
  const navigate = useNavigate();
  const { isSidebarVisible, handleCloseClick, categories, isLoggedIn } = props;
  function handleLoginClick() {
    navigate('/login');
    handleCloseClick();
  }
  function handleRegisterClick() {
    navigate('/register');
    handleCloseClick();
  }
  function handleCategoryClick(category) {
    navigate(`/categories/${category}`);
    handleCloseClick();
  }
  function handleOrdersClick() {
    navigate(`/profile/myorders`);
    handleCloseClick();
  }
  function handleWishlistClick() {
    navigate(`/profile/mywishlist`);
    handleCloseClick();
  }
  return (
    <div className={`mobile-side-navbar ${isSidebarVisible ? "w-100" : "w-0"}`}>
      <div className="side-navbar">
        <div className="side-nabvar-head">
          {
            isLoggedIn ?
            (<div>User</div>) :
            (<div><span onClick={handleLoginClick}>Login</span> | <span onClick={handleRegisterClick}>Register</span></div>)
          }
          <ArrowBack style={{ color: "white" }} onClick={handleCloseClick} />
        </div>
        <div className="side-navbar-body">
          <div className="side-navbar-sub-head">categories</div>
          <div className="side-navbar-list">
            {
              Array.isArray(categories) &&
              categories.map((category, i)=>{
                if(category === 'ac') {
                  return <div className="side-navbar-list-items" key={i} onClick={()=>handleCategoryClick(category)}>air conditioners</div>
                }
                else if(category === 'tv') {
                  return <div className="side-navbar-list-items" key={i} onClick={()=>handleCategoryClick(category)}>televisions</div>
                }
                else if(category === 'kitchenappliances') {
                  return <div className="side-navbar-list-items" key={i} onClick={()=>handleCategoryClick(category)}>kitchen appliances</div>
                }
                else if(category === 'washingMachine') {
                  return <div className="side-navbar-list-items" key={i} onClick={()=>handleCategoryClick(category)}>washing machine</div>
                }
                else {
                  return <div className="side-navbar-list-items" key={i} onClick={()=>handleCategoryClick(category)}>{category}</div>
                }
              })
            }
          </div>  
          {
            isLoggedIn ? 
            (<>
              <div className="side-navbar-sub-head">My Account</div>
              <div className="side-navbar-list">
                <div className="side-navbar-list-items" onClick={handleOrdersClick}>my orders</div>
                <div className="side-navbar-list-items" onClick={handleWishlistClick}>my wishlist</div>
              </div>
            </>) :
            (null)

          }
          
        </div>
      </div>
    </div>
  );
}

export default SidebarDrawer;
