import { GET_COMMENTS, POST_COMMENT } from "./types";

import Axios from "axios";

export const postComment = (msg, user_id, post_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await Axios.put(
      `/api/post/comment/${user_id}/${post_id}`,
      { comment: msg },
      config
    );
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
};
