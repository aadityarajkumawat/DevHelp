import { GET_TRENDING_POSTS } from '../actions/types';

const initialState = {
    trendingPosts: [],
    loading: true,
};

const trendingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRENDING_POSTS:
            return {
                ...state,
                trendingPosts: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default trendingReducer;
