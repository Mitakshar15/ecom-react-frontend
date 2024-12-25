import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { RegisterForm } from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { clearAuthError } from "../../State/Auth/Action";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: '90%',
    sm: 500
  },
  bgcolor: "background.paper",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  borderRadius: "8px",
  outline: "none",
};

export const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Clear error state when modal opens or when the location changes
  useEffect(() => {
    if (open) {
      dispatch(clearAuthError());
    }
  }, [open, dispatch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal"
      aria-describedby="authentication-modal"
    >
      <Box sx={modalStyle}>
        {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Modal>
  );
};
