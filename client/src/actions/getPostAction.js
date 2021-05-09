import axios from "axios";
import { API } from "..";
import {
  CLEAN_POST_ACTION,
  CLEAR_POST,
  CLEAR_POST_ID,
  DELETE_POST,
  GET_LIKED_POST,
  GET_POST,
  GET_POST_ID,
  GET_SAVED_POST,
  GET_USER_POSTS,
  LIKE_POST,
  REALLY_GET_ALL_POSTS,
  RESET_IMAGE_UPLOAD,
  SAVE_POST_TOAST,
  SET_CURRENT_POST,
  SET_LOADING_POST_TRUE,
  TOGGLE_SAVE_POST,
  UPLOAD_POST,
} from "../actions/types";
import { loadUser } from "./authAction";

export const getPost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const url = `${API}/api/post/${post_id}`;
      dispatch({ type: SET_LOADING_POST_TRUE });
      const res = await axios.get(url);
      dispatch({ type: GET_POST, payload: res.data }); // * this will fetch a single post given the post id
    }
  } catch (err) {}
};

export const setCurrentPost = (post_id) => (dispatch) => {
  dispatch({ type: SET_CURRENT_POST, payload: post_id }); //this add the current post to app level state
};

export const clearPost = () => (dispatch) => {
  dispatch({ type: CLEAR_POST }); //just clear out the post which it showed just previously
};

export const uploadPost = (post, post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (post_id !== undefined) {
      const res = await axios.post(
        `${API}/api/post/content/${post_id}`,
        post,
        config
      );
      dispatch({ type: UPLOAD_POST, payload: res.data });
      dispatch(loadUser());
    }
  } catch (err) {}
};

// ? Extension of above
export const uploadImage = (fData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_IMAGE_UPLOAD });
    const res = await axios.post(`${API}/api/upload`, fData);
    dispatch({ type: GET_POST_ID, payload: res.data._id });
  } catch (err) {}
};

export const getUserPosts = (user_id) => async (dispatch) => {
  try {
    if (user_id !== undefined) {
      const res = await axios.get(`${API}/api/post/all/${user_id}`);
      dispatch({ type: GET_USER_POSTS, payload: res.data });
    }
  } catch (err) {}
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.delete(`${API}/api/post/${post_id}`);
      dispatch({ type: DELETE_POST, payload: res.data });
    }
  } catch (err) {}
};

export const savePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.post(`${API}/api/save/${post_id}`);
      dispatch({ type: TOGGLE_SAVE_POST, payload: res.data });
      dispatch({ type: SAVE_POST_TOAST, payload: true });
      setTimeout(() => {
        dispatch({ type: SAVE_POST_TOAST, payload: false });
      }, 5000);
    }
  } catch (err) {}
};

export const getSavedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/api/save`);
    dispatch({ type: GET_SAVED_POST, payload: res.data });
  } catch (err) {}
};

export const likePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.put(`${API}/api/post/like/${post_id}`);
      dispatch({ type: LIKE_POST, payload: res.data });
    }
  } catch (err) {}
};

export const getLikedPosts = (user, post_id) => async (dispatch) => {
  try {
    if (user !== undefined && post_id !== undefined) {
      const res = await axios.get(`${API}/api/post/${user}/${post_id}`);
      dispatch({ type: GET_LIKED_POST, payload: res.data });
    }
  } catch (err) {}
};

export const reallyGetAllPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/api/post/real-all/${userId}`);
    dispatch({ type: REALLY_GET_ALL_POSTS, payload: res.data });
  } catch (error) {}
};

export const clearPostID = () => (dispatch) => {
  dispatch({ type: CLEAR_POST_ID });
};

export const cleanGetPostAction = () => (dispatch) => {
  dispatch({ type: CLEAN_POST_ACTION });
};

export const fetchPopularPosts = () => async (dispatch) => {
  try {
    await axios.get(`${API}/api/post/5fc4c6a6cf07d202383aadcf`);
    // dispatch({ type: , payload: res.data });
  } catch (err) {}
};
