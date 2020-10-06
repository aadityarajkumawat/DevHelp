import { ACCESS_POST, CLEAN_ADMIN_PRIVILAGES } from "../actions/types";

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
    case CLEAN_ADMIN_PRIVILAGES:
      return {
        ...state,
        postAccessibility: false,
      };
    default:
      return state;
  }
};

export default adminPrivilagesReducer;
