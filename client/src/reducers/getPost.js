import {
    GET_POST,
    SET_CURRENT_POST,
    CLEAR_POST,
    GET_USER_POSTS,
    UPLOAD_POST,
    GET_SAVED_POST,
    SAVE_POST,
} from '../actions/types';

const initialState = {
    loadingPost: true,
    openedPost: {}, //this is current post which is displayed
    currentPost: null, //this will just be a string of postID
    userPosts: [],
    loadingUserPosts: true,
    uploadedStatus: false,
    savedPosts: [], //this will get saved posts from backend
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SAVED_POST:
            return {
                ...state,
                savedPosts: action.payload,
            };
        case GET_POST:
            return {
                ...state,
                openedPost: action.payload,
                loadingPost: false,
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
        case UPLOAD_POST:
            return {
                ...state,
                uploadedStatus: true,
            };
        default:
            return state;
    }
};

export default postReducer;
