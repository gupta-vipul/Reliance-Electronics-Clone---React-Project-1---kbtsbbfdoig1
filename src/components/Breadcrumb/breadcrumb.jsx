import React from 'react'
import './breadcrumb.css';
import { Link } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

function Breadcrumb() {
  return (
    <div className="breadcrumb-bar">
        <ul>
          <li>
            <Link
              to="/"
              style={{
                display: "flex",
                color: "rgba(0,0,0,0.6)",
                marginLeft: "8px",
              }}
            >
              <HomeIcon style={{ width: "18px", height: "18px" }} />
            </Link>
          </li>
        </ul>
      </div>
  )
}

export default Breadcrumb;