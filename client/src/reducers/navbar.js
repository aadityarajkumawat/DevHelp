import { DISPLAY_NAVBAR, REMOVE_NAVBAR } from '../actions/types';

const initialState = true;

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_NAVBAR:
            return true;
        case REMOVE_NAVBAR:
            return false;
        default:
            return state;
    }
};

export default navbarReducer;
