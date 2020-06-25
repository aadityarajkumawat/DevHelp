import { GET_POST, SET_CURRENT_POST, CLEAR_POST } from '../actions/types';
import axios from 'axios';

export const getPost = (post_id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/post/open/${post_id}`);
        dispatch({ type: GET_POST, payload: res.data }); //this will fetch a single post given the post id
    } catch (err) {
        console.log(err.message);
    }
};

export const setCurrentPost = (post_id) => (dispatch) => {
    dispatch({ type: SET_CURRENT_POST, payload: post_id }); //this add the current post to app level state
};

export const clearPost = () => (dispatch) => {
    dispatch({ type: CLEAR_POST }); //just clear out the post which it showed just previously
};
