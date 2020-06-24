import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from './types';

import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertAction';

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }

    try {
        const res = await Axios.get('/api/auth');
        dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register user
export const register = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await Axios.post('/api/user', formData, config);
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
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await Axios.post('/api/auth', formData, config);
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
