import {
    GET_POST,
    SET_CURRENT_POST,
    CLEAR_POST,
    GET_USER_POSTS,
} from '../actions/types';

const initialState = {
    loadingPost: true,
    openedPost: {},
    currentPost: null, //this will just be a string of postID
    userPosts: [],
    loadingUserPosts: true,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST:
            return {
                ...state,
                loading: false,
                openedPost: action.payload,
            };
        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload,
            };
        case CLEAR_POST:
            return {
                ...state,
                openedPost: {},
                currentPost: null,
            };
        case GET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
                loadingUserPosts: false,
            };
        default:
            return state;
    }
};

export default postReducer;
