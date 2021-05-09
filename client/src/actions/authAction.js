import Axios from "axios";
import { API } from "..";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alertAction";
import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from "./types";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await Axios.get(`${API}/api/auth`);
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await Axios.post(`${API}/api/user`, formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    // Load user after authentication
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE });

    // Get errors array from backends
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await Axios.post(`${API}/api/auth`, formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    // Load user after authentication
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE });

    // Get errors array from backends
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
