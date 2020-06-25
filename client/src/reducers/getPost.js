import { GET_POST, SET_CURRENT_POST, CLEAR_POST } from '../actions/types';

const initialState = {
    loading: true,
    openedPost: {},
    currentPost: null, //this will just be a string of postID
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
        default:
            return state;
    }
};

export default postReducer;
