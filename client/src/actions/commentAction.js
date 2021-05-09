import { COMMENT_TOAST, GET_COMMENTS, POST_COMMENT } from "./types";
import Axios from "axios";

export const postComment = (msg, user_id, post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: POST_COMMENT, payload: true });
    await Axios.put(
      `/api/post/comment/${user_id}/${post_id}`,
      { comment_msg: msg },
      config
    );
    dispatch({ type: POST_COMMENT, payload: false });
    dispatch({ type: COMMENT_TOAST, payload: true });
    setTimeout(() => {
      dispatch({ type: COMMENT_TOAST, payload: false });
    }, 5000);
  } catch (err) {
  }
};

export const getComments = (post_id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/post/comment/all/${post_id}`);
    dispatch({ type: GET_COMMENTS, payload: res.data });
  } catch (err) {
  }
};
