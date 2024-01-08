import "./header.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import {
  GET_CART_ITEMS,
  GET_CATEGORIES,
  GET_PINCODE_DETAILS,
  GET_SEARCH_DATA,
} from "../../Constants/APIs";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import Navbar from "../Navbar";
import Dropdown from "../Menu/Dropdown";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SidebarDrawer from "../SidebarDrawer/SidebarDrawer";

const Header = () => {
  const SearchInputRef = useRef();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setSearchInputText } = useContext(SearchContext);
  const { cartCount, setCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const autoHideHeaderList = [
    {
      id: uuidv4(),
      displayName: "Find a store",
      path: "/",
    },
    {
      id: uuidv4(),
      displayName: "Buying guides",
      path: "/",
    },
    {
      id: uuidv4(),
      displayName: "Contact us",
      path: "/",
    },
  ];
  const mainHeaderList = [
    {
      id: uuidv4(),
      displayName: "Select your Pin Code",
      path: "/",
    },
    {
      id: uuidv4(),
      displayName: "Cart",
      path: "/cart",
    },
    {
      id: uuidv4(),
      displayName: "Login",
      path: "/login",
    },
  ];

  const [categories, setCategories] = useState([]);
  const [loginText, setLoginText] = useState("");

  const [pincodeModal, setPincodeModal] = useState(false);
  const [fetchedPincodeDetails, setFetchedPincodeDetails] = useState({
    pincode: "",
    district: "",
    helperText: "",
    isError: false,
  });
  const [userDeliveryLocation, setUserDeliveryLocation] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  async function getAllCategories() {
    const response = await fetch(GET_CATEGORIES, {
      headers: {
        projectID: "kbtsbbfdoig1",
      },
    });
    const data = await response.json();
    setCategories(data.data);
  }
  async function getCartCount() {
    const response = await fetch(GET_CART_ITEMS, {
      headers: {
        projectID: "kbtsbbfdoig1",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await response.json();
    setCartCount(jsonData.results);
  }
  // Checking Indian Pincode as per user input
  function handleChange(e) {
    setUserDeliveryLocation(e.target.value);
  } 
  async function validatePincode(pincode) {
    const response = await fetch(GET_PINCODE_DETAILS(pincode));
    const jsonData = await response.json()
    if(jsonData[0].Status === "Success") {
        const updatedDetails = {...fetchedPincodeDetails};
        updatedDetails.isError = false;
        updatedDetails.helperText = "";
        updatedDetails.pincode = pincode;
        updatedDetails.district = jsonData[0].PostOffice[0].District;
        setFetchedPincodeDetails(updatedDetails);
        
        setPincodeModal(false);
    }
    else {
        const updatedDetails = {...fetchedPincodeDetails};
        updatedDetails.isError = true;
        updatedDetails.pincode = "";
        updatedDetails.district = "";
        updatedDetails.helperText = "Enter Valid 6-digit Pin Code!";
        setFetchedPincodeDetails(updatedDetails);
    }
  }
  function checkPincode(e) {
    e.preventDefault();
    validatePincode(userDeliveryLocation);
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    if (SearchInputRef.current.value !== "") {
      navigate(`/search/${SearchInputRef.current.value}`);
      setSearchInputText(SearchInputRef.current.value);
    }
  }

  function handleClick() {
    if (loginText === "Login") {
      navigate("/login");
    } else {
      // console.log("Logout");
      // localStorage.removeItem("token");
      navigate("/profile/myaccount");
      // setIsLoggedIn(false);
    }
  }
  function handleCloseClick() {
    setIsSidebarVisible(false);
  }
  useEffect(() => {
    getAllCategories();
    // console.log(userDetails);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));
    if (token) {
      getCartCount();
    }
    setLoginText(token ? `Hi ${userDetails.name}` : "Login");
  }, [isLoggedIn]);

  return (
    <>
      <div className="autohideheader">
        <ul className="flex">
          {autoHideHeaderList.map(({ id, displayName }) => {
            return <li key={id}>{displayName}</li>;
          })}
        </ul>
      </div>
      <div className="header-main flex">
        <SidebarDrawer categories={categories} isSidebarVisible={isSidebarVisible} handleCloseClick={handleCloseClick} isLoggedIn={isLoggedIn}/>
        <div className="flex mobile-view-header-menu-logo">
          <div className="mobile-menu"><Menu sx={{color: "white"}} onClick={()=>setIsSidebarVisible(true)}/></div>
          <Link to="/">
            <img className="headerlogo" src="/rd_logo.svg" alt="logo" />
          </Link>
        </div>
        {/* <Dropdown categories={categories} /> */}
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            ref={SearchInputRef}
            className="search-input"
            type="text"
            placeholder="Find your favorite products"
          />
          <button type="submit" className="searchbtn">
            <SearchIcon className="searchIcon" />
          </button>
        </form>
        <ul className="flex">
          {mainHeaderList.map((listItem) => {
            if (listItem.displayName === "Cart") {
              return (
                <li className="cart-icon-header flex" key={listItem.id}>
                  <Link to={listItem.path}>
                    <ShoppingCartIcon className="headericon" />
                    <span>
                      {listItem.displayName}
                      {
                        cartCount ? 
                        (<div className={`cart-count-header ${cartCount }`}>{cartCount}</div>) :
                        (null)
                      }
                    </span>
                  </Link>
                </li>
              );
            } else if (listItem.displayName === "Login") {
              return (
                <li className="flex" key={listItem.id} onClick={handleClick}>
                  <PersonIcon className="headericon" />
                  <span>{loginText}</span>
                </li>
              );
            } else {
              return (
                <li key={listItem.id} onClick={()=>setPincodeModal(true)}>
                  {
                    listItem.displayName === "Select your Pin Code" ? 
                        (<>{
                            fetchedPincodeDetails.pincode && fetchedPincodeDetails.district ? 
                            (`Deliver to ${fetchedPincodeDetails.district.toUpperCase()} ${fetchedPincodeDetails.pincode}`) :
                            ("Select your Pin Code")
                        }</>) : 
                        ("Select your Pin Code")
                  }
                </li>
              );
            }
          })}
        </ul>
      </div>
      <Navbar />
      {pincodeModal
        ? createPortal(
            <div className="pincode-window">
              <div className="pincode-box">
                <div className="pincode-box-header">
                  <div className="pincode-head-text">
                    Choose your delivery location
                  </div>
                  <button
                    className="pincode-box-close-btn"
                    onClick={()=>setPincodeModal(false)}
                  >
                    <CloseIcon sx={{ color: "white" }} />
                  </button>
                </div>
                <div className="pincode-form">
                  <form>
                    <TextField
                        error={fetchedPincodeDetails.isError}
                      id="outlined-pincode-input"
                      label="Enter Delivery Pincode"
                      type="text"
                      size="small"
                      onChange={handleChange}
                      helperText={fetchedPincodeDetails.helperText}
                      fullWidth
                    />
                    <button
                      className="pincode-check-btn"
                      onClick={checkPincode}
                    >
                      apply
                    </button>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default Header;
