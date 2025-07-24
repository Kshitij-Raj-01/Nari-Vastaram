import { Box, Modal, Tabs, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
