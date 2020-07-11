import {
    PROFILE_PHOTO,
    RESET_PROFILE_PHOTO,
    GET_PROFILE,
    TOGGLE_EDIT_PROFILE_BACKDROP,
    EDIT_PROFILE,
} from './types';
import Axios from 'axios';

export const uploadProfilePhoto = (formData) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PROFILE_PHOTO });
        const res = await Axios.post('/api/upload/profile', formData);
        dispatch({ type: PROFILE_PHOTO, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

export const loadProfile = () => async (dispatch) => {
    try {
        const res = await Axios.get('/api/profile');
        dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

export const editProfile = (fData) => async (dispatch) => {
    try {
        const res = await Axios.post('/api/profile', fData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch({ type: EDIT_PROFILE, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

export const toggleBackdrop = (bool) => (dispatch) => {
    dispatch({ type: TOGGLE_EDIT_PROFILE_BACKDROP, payload: bool });
};
