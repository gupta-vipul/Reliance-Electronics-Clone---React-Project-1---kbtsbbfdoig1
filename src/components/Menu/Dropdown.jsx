import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const { categories } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        Menu
        {open ? (
          <CloseIcon style={{ fontSize: "20px" }} />
        ) : (
          <MenuIcon style={{ fontSize: "20px" }} />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // style ={{backgroundColor: "var(--secondary-color)"}}
      >
        {categories &&
          Array.isArray(categories) &&
          categories.map((category) => {
            return (
              <Link to={`/${category}`} key={category}>
                <MenuItem onClick={handleClose}>
                  {category}
                </MenuItem>
              </Link>
            );
          })}
      </Menu>
    </div>
  );
};

export default Dropdown;
