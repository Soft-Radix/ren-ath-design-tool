import React, { useContext, useState } from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import {
  ArrowDownIcon,
  ChangePasswordIcon,
  LogOutIcon,
  MyAccountIcon,
  MyDesignIcon,
  ProfileIcon,
} from "../../../utils/icons";
import styles from "./AccountMenu.module.scss";
import { clearUserLocalData } from "../../../utils/common";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    clearUserLocalData();
    setUser(null);
    handleClose();
    navigate("/");
  };

  return (
    <div>
      <IconButton
        sx={{ padding: 0, gap: 1 }}
        edge="end"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MyAccountIcon />
        <ArrowDownIcon onClick={handleClick} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="account-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={styles.menuOptions}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 3,
            filter: "drop-shadow(0px 4px 40px #00000033)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
          className={styles.menuItem}
        >
          <ProfileIcon /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <ChangePasswordIcon />
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/my-design")}
          className={styles.menuItem}
        >
          <MyDesignIcon />
          My Designs
        </MenuItem>
        <MenuItem onClick={handleLogout} className={styles.menuItem}>
          <LogOutIcon />
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
