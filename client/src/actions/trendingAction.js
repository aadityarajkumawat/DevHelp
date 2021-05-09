import axios from "axios";
import { API } from "..";
import { GET_TRENDING_POSTS } from "../actions/types";

export const getTrendingPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/api/post/`);
    dispatch({ type: GET_TRENDING_POSTS, payload: res.data });
  } catch (err) {}
};
