import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {},
    loading: true,
    errors: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                errors: null,
            };
        case REGISTER_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
