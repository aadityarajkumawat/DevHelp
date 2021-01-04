import { DISPATCH_POPUP, REMOVE_POPUP } from "../actions/types";

const initialState = {
  heading: "",
  message: "",
  mounted: false,
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPATCH_POPUP:
      return {
        ...state,
        heading: action.payload.heading,
        message: action.payload.message,
        mounted: true,
      };
    case REMOVE_POPUP:
      return {
        ...state,
        mounted: false,
        heading: "",
        message: "",
      };
    default:
      return state;
  }
};

export default popupReducer;
