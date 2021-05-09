import {
  GET_POST,
  SET_CURRENT_POST,
  CLEAR_POST,
  UPLOAD_POST,
  GET_USER_POSTS,
  DELETE_POST,
  LIKE_POST,
  TOGGLE_SAVE_POST,
  GET_SAVED_POST,
  GET_LIKED_POST,
  GET_POST_ID,
  CLEAR_POST_ID,
  SET_LOADING_POST_TRUE,
  RESET_IMAGE_UPLOAD,
  CLEAN_POST_ACTION,
  REALLY_GET_ALL_POSTS,
  SAVE_POST_TOAST,
} from "../actions/types";
import axios from "axios";
import { loadUser } from "./authAction";

export const getPost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const url = `/api/post/${post_id}`;
      dispatch({ type: SET_LOADING_POST_TRUE });
      const res = await axios.get(url);
      dispatch({ type: GET_POST, payload: res.data }); // * this will fetch a single post given the post id
    }
  } catch (err) {
  }
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
        `/api/post/content/${post_id}`,
        post,
        config
      );
      dispatch({ type: UPLOAD_POST, payload: res.data });
      dispatch(loadUser());
    }
  } catch (err) {
  }
};

// ? Extension of above
export const uploadImage = (fData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_IMAGE_UPLOAD });
    const res = await axios.post("/api/upload", fData);
    dispatch({ type: GET_POST_ID, payload: res.data._id });
  } catch (err) {
  }
};

export const getUserPosts = (user_id) => async (dispatch) => {
  try {
    if (user_id !== undefined) {
      const res = await axios.get(`/api/post/all/${user_id}`);
      dispatch({ type: GET_USER_POSTS, payload: res.data });
    }
  } catch (err) {
  }
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.delete(`/api/post/${post_id}`);
      dispatch({ type: DELETE_POST, payload: res.data });
    }
  } catch (err) {
  }
};

export const savePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.post(`/api/save/${post_id}`);
      dispatch({ type: TOGGLE_SAVE_POST, payload: res.data });
      dispatch({ type: SAVE_POST_TOAST, payload: true });
      setTimeout(() => {
        dispatch({ type: SAVE_POST_TOAST, payload: false });
      }, 5000);
    }
  } catch (err) {
  }
};

export const getSavedPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/save");
    dispatch({ type: GET_SAVED_POST, payload: res.data });
  } catch (err) {
  }
};

export const likePost = (post_id) => async (dispatch) => {
  try {
    if (post_id !== undefined) {
      const res = await axios.put(`/api/post/like/${post_id}`);
      dispatch({ type: LIKE_POST, payload: res.data });
    }
  } catch (err) {
  }
};

export const getLikedPosts = (user, post_id) => async (dispatch) => {
  try {
    if (user !== undefined && post_id !== undefined) {
      const res = await axios.get(`/api/post/${user}/${post_id}`);
      dispatch({ type: GET_LIKED_POST, payload: res.data });
    }
  } catch (err) {
  }
};

export const reallyGetAllPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/real-all/${userId}`);
    dispatch({ type: REALLY_GET_ALL_POSTS, payload: res.data });
  } catch (error) {
  }
};

export const clearPostID = () => (dispatch) => {
  dispatch({ type: CLEAR_POST_ID });
};

export const cleanGetPostAction = () => (dispatch) => {
  dispatch({ type: CLEAN_POST_ACTION });
};

export const fetchPopularPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post/5fc4c6a6cf07d202383aadcf");
    // dispatch({ type: , payload: res.data });
  } catch (err) {
  }
};
