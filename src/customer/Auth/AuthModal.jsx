import { Box, Modal, Tabs, Tab } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
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

  const hasMergedCart = useRef(false); // 💖 to ensure one-time merge only

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 💞 Merge guest cart into user cart once after login
  useEffect(() => {
    if (auth.user && !hasMergedCart.current) {
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
            hasMergedCart.current = true; // 💍 prevent future merges
          })
          .catch((err) => {
            console.error("Merge cart failed:", err);
          });
      } else {
        hasMergedCart.current = true; // ✅ even if guestCart is empty
      }

      handleClose(); // ✨ Close modal after login
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
