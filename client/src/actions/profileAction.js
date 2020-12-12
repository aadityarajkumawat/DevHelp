import {
  PROFILE_PHOTO,
  RESET_PROFILE_PHOTO,
  GET_PROFILE,
  TOGGLE_EDIT_PROFILE_BACKDROP,
  EDIT_PROFILE,
  CLEAN_PROFILE_ACTION,
  SET_SAVING_STATUS,
  GET_THAT_PROFILE,
} from "./types";
import Axios from "axios";

export const uploadProfilePhoto = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PROFILE_PHOTO });
    const res = await Axios.post("/api/upload/profile", formData);
    dispatch({ type: PROFILE_PHOTO, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const loadProfile = () => async (dispatch) => {
  try {
    console.log(typeof dispatch);
    if (localStorage.getItem("token")) {
      const res = await Axios.get("/api/profile");
      dispatch({ type: GET_PROFILE, payload: res.data });
    }
  } catch (err) {
    console.log(err);
  }
};

export const editProfile = (fData) => async (dispatch) => {
  try {
    const res = await Axios.post("/api/profile", fData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: EDIT_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const getThatProfileE = (userId) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/profile/${userId}`);
    dispatch({ type: GET_THAT_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
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
