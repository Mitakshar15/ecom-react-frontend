import { Alert, Button, Grid, Snackbar, TextField, Typography, Box, InputAdornment, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";
import { authStyles } from './AuthStyles';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const handleClose = () => setOpenSnackBar(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
    if (auth.user || auth.error) {
      setOpenSnackBar(false);
    }
  }, [jwt, auth.user, auth.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      mobile: data.get("phone"),
      password: password,
    };
    dispatch(register(userData));
    handleClose();
  };

  const handleNavigateToLogin = () => {
    setOpenSnackBar(false);
    navigate("/login");
  };

  return (
    <Box sx={authStyles.formContainer}>
      <Box sx={authStyles.title}>
        <Typography variant="h5" component="h1" fontWeight="600" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please fill in your information below
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              autoComplete="tel"
              inputProps={{
                pattern: "[0-9]{10}",
              }}
              helperText="Please enter a valid 10-digit phone number"
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="new-password"
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              error={!!passwordError}
              helperText={passwordError}
              sx={authStyles.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={authStyles.submitButton}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography sx={authStyles.linkText}>
          Already have an account?{' '}
          <Button
            onClick={handleNavigateToLogin}
            sx={{ 
              ml: 1,
              color: '#9155FD',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#804DE2'
              }
            }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert 
          onClose={handleClose} 
          severity={auth.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {auth.error 
            ? auth.error === "Registration failed" 
              ? "THIS EMAIL IS ALREADY REGISTERED" 
              : auth.error 
            : "Registration Successful"}
        </Alert>
      </Snackbar>
    </Box>
  );
};
