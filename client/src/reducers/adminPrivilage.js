import { ACCESS_POST } from '../actions/types';

const initialState = {
    postAccessibility: false,
};

const adminPrivilagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCESS_POST:
            return {
                ...state,
                postAccessibility: action.payload,
            };
        default:
            return state;
    }
};

export default adminPrivilagesReducer;
