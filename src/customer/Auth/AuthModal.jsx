import { Box, Modal, Tabs, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from "../../State/Cart/Action";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  borderRadius: 2,
  p: { xs: 2, sm: 4 },
};

const AuthModal = ({ open, handleClose, defaultTab = "login" }) => {
  const [value, setValue] = useState(defaultTab === "register" ? 1 : 0);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 💕 Merge guest cart items to user cart after login/register
  useEffect(() => {
    if (auth.user) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

      if (guestCart.length > 0) {
        const token = sessionStorage.getItem("jwt");

        fetch(`${API_BASE_URL}/api/cart/merge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: guestCart }),
        })
          .then((res) => res.json())
          .then(() => {
            localStorage.removeItem("guest_cart");
            dispatch(getCart());
          })
          .catch((err) => {
            console.error("Merge cart failed:", err);
          });
      }

      handleClose(); // 💫 Close the modal after successful login
    }
  }, [auth.user]);

  useEffect(() => {
    setValue(defaultTab === "register" ? 1 : 0);
  }, [defaultTab]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {value === 0 ? (
            <LoginForm handleClose={handleClose} />
          ) : (
            <RegisterForm handleClose={handleClose} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
