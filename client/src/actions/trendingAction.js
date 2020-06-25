import { GET_TRENDING_POSTS } from '../actions/types';
import axios from 'axios';

export const getTrendingPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/post/');
        dispatch({ type: GET_TRENDING_POSTS, payload: res.data });
    } catch (err) {
        console.log('Error Fetching All Articles');
    }
};
