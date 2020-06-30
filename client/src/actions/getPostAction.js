import {
    GET_POST,
    SET_CURRENT_POST,
    CLEAR_POST,
    UPLOAD_POST,
    GET_USER_POSTS,
    DELETE_POST,
} from '../actions/types';
import axios from 'axios';
import { loadUser } from './authAction';

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

export const uploadPost = (post) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    console.log(post);
    try {
        const res = await axios.post('/api/post', post, config);
        dispatch({ type: UPLOAD_POST, payload: res.data });

        dispatch(loadUser());
    } catch (err) {
        console.log(err);
    }
};

export const getUserPosts = (user_id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/post/${user_id}/3`);
        dispatch({ type: GET_USER_POSTS, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};

export const deletePost = (post_id) => async (dispatch) => {
    try {
        await axios.delete(`/api/post/${post_id}`);
        dispatch({ type: DELETE_POST });
    } catch (err) {
        console.log(err);
    }
};
