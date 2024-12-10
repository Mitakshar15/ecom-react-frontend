import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
} from "./ActionType";
import { type } from "@testing-library/user-event/dist/type";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    console.log("registerr :- ", user);
    dispatch(registerSuccess(user));
  } catch (error) {
    console.log("error ", error);
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(loginSuccess(user));
    } else {
      const error = new Error("Invalid credentials");
      error.response = { data: { message: "Login failed - Invalid credentials" }};
      dispatch(loginFailure(error.message));
      throw error; // Throw error to be caught by the component
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Invalid email or password";
    dispatch(loginFailure(errorMessage));
    throw error; // Re-throw the error so it can be caught in the component
  }
};

export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};
