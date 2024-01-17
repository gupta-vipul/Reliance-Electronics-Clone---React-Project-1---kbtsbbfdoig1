import React, { useContext, useEffect, useState } from "react";
import IsAuth from "../components/IsAuth/IsAuth";
import Breadcrumb from "../components/Breadcrumb/breadcrumb";
import { v4 as uuidv4 } from "uuid";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const profileNavList = [
    {
      _id: uuidv4(),
      displayName: "My Account",
      path: "/profile/myaccount",
    },
    {
      _id: uuidv4(),
      displayName: "My Orders",
      path: "/profile/myorders",
    },
    {
      _id: uuidv4(),
      displayName: "My Wishlist",
      path: "/profile/mywishlist",
    },
    {
      _id: uuidv4(),
      displayName: "Logout",
    },
  ];
  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("addresses");
    localStorage.removeItem("pincode");
    navigate("/");
  }
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userDetails);
  }, []);
  return (
    <div className="user-account">
      <Breadcrumb />
      <div className="user-account-container flex">
        <div className="profile-left-section flex">
          <div className="about-user">
            <div className="user-name">{userInfo && userInfo.name}</div>
            <div className="user-email">{userInfo && userInfo.email}</div>
          </div>
          <div className="profile-nav-drawer">
            <ul>
              {profileNavList.map((listItem) => {
                if (listItem.displayName === "Logout") {
                  return (
                    <li
                      className="Logout-btn"
                      key={listItem._id}
                      onClick={logout}
                    >
                      {listItem.displayName}
                    </li>
                  );
                } else {
                  return (
                    <Link to={listItem.path} key={listItem._id}>
                      <li
                        className={
                          location.pathname === listItem.path ? "active" : null
                        }
                      >
                        {listItem.displayName}
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div className="display-details">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IsAuth(Profile);
