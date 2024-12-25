import { Button, Grid, TextField, Snackbar, Alert, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../State/Auth/Action";
import { authStyles } from './AuthStyles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useSelector((store) => store);
  const handleCloseSnakbar = () => setOpenSnackBar(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.error) setOpenSnackBar(false);
    else handleCloseSnakbar();
  }, [auth.error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      await dispatch(login(userData));
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
      setOpenSnackBar(true);
    }
  };

  const handleNavigateToRegister = () => {
    setOpenSnackBar(false);
    setErrorMessage("");
    navigate("/register");
  };

  return (
    <Box sx={authStyles.formContainer}>
      <Box sx={authStyles.title}>
        <Typography variant="h5" component="h1" fontWeight="600" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please sign in to continue
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
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
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="current-password"
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={authStyles.submitButton}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography sx={authStyles.linkText}>
          Don't have an account?{' '}
          <Button
            onClick={handleNavigateToRegister}
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
            Sign Up
          </Button>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnakbar}
      >
        <Alert 
          onClose={handleCloseSnakbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
