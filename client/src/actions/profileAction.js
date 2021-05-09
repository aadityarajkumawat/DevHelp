import Axios from "axios";
import { API } from "..";
import {
  CLEAN_PROFILE_ACTION,
  EDIT_PROFILE,
  GET_PROFILE,
  GET_THAT_PROFILE,
  PROFILE_PHOTO,
  RESET_PROFILE_PHOTO,
  SET_SAVING_STATUS,
  TOGGLE_EDIT_PROFILE_BACKDROP,
} from "./types";

export const uploadProfilePhoto = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PROFILE_PHOTO });
    const res = await Axios.post(`${API}/api/upload/profile`, formData);
    dispatch({ type: PROFILE_PHOTO, payload: res.data });
  } catch (err) {}
};

export const loadProfile = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const res = await Axios.get(`${API}/api/profile`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    }
  } catch (err) {}
};

export const editProfile = (fData) => async (dispatch) => {
  try {
    const res = await Axios.post(`${API}/api/profile`, fData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: EDIT_PROFILE, payload: res.data });
  } catch (err) {}
};

export const getThatProfileE = (userId) => async (dispatch) => {
  try {
    const res = await Axios.get(`${API}/api/profile/${userId}`);
    dispatch({ type: GET_THAT_PROFILE, payload: res.data });
  } catch (err) {}
};

export const toggleBackdrop = (bool) => (dispatch) => {
  dispatch({ type: TOGGLE_EDIT_PROFILE_BACKDROP, payload: bool });
};

export const cleanProfile = () => (dispatch) => {
  dispatch({ type: CLEAN_PROFILE_ACTION });
};

export const setSavingStatus = () => (dispatch) => {
  dispatch({ type: SET_SAVING_STATUS });
};
