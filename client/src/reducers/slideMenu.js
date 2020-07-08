import { TOGGLE_SLIDE_MENU } from '../actions/types';

const initialState = false;

const slideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SLIDE_MENU:
            return action.payload;
        default:
            return state;
    }
};

export default slideMenuReducer;
