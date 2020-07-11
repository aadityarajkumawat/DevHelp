import {
    PROFILE_PHOTO,
    RESET_PROFILE_PHOTO,
    GET_PROFILE,
    TOGGLE_EDIT_PROFILE_BACKDROP,
    EDIT_PROFILE,
} from '../actions/types';

const initialState = {
    profile: {},
    recievedProfile: false,
    backdrop: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case TOGGLE_EDIT_PROFILE_BACKDROP:
            return {
                ...state,
                backdrop: action.payload,
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case RESET_PROFILE_PHOTO:
            return {
                ...state,
                recievedProfile: false,
            };
        case PROFILE_PHOTO:
            return {
                ...state,
                profile: action.payload,
                recievedProfile: true,
            };
        default:
            return state;
    }
};

export default profileReducer;
