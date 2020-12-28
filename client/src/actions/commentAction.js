import { GET_COMMENTS, POST_COMMENT } from "./types";
import Axios from "axios";

export const postComment = (msg, user_id, post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: POST_COMMENT, payload: true });
    const res = await Axios.put(
      `/api/post/comment/${user_id}/${post_id}`,
      { comment_msg: msg },
      config
    );
    dispatch({ type: POST_COMMENT, payload: false });
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
};

export const getComments = (post_id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/post/comment/all/${post_id}`);
    console.log(post_id);
    dispatch({ type: GET_COMMENTS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
