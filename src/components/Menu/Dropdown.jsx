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
      >
        <div className="menuBtn-inset">
        <span className="menuBtn-text">Menu</span>
        {open ? (
          <CloseIcon style={{ fontSize: "22px" }} />
        ) : (
          <MenuIcon style={{ fontSize: "22px" }} />
        )}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {categories &&
          Array.isArray(categories) &&
          categories.map((category) => {
            return (
              <Link to={`/categories/${category}`} key={category}>
                <MenuItem sx={{textTransform: 'capitalize',}}onClick={handleClose}>
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
