import {
  INIT_DROP_ANIM,
  INIT_EDIT_PROFILE_ANIM,
  RESET_DROP_ANIM,
  RESET_EDIT_PROFILE_ANIM,
} from "../actions/types";

const initialState = {
  editProfileContainer: {
    opacity: 0,
    duration: 0,
    y: 0,
  },
  dropDown: {
    scale: 0.9,
    duration: 0,
  },
};

const framerAnimationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_EDIT_PROFILE_ANIM:
      return {
        ...state,
        editProfileContainer: {
          opacity: 1,
          duration: 0.5,
          y: 20,
        },
      };
    case RESET_EDIT_PROFILE_ANIM:
      return {
        ...state,
        editProfileContainer: {
          ...state,
          opacity: 0,
          duration: 0,
          y: 0,
        },
      };
    case INIT_DROP_ANIM:
      return {
        ...state,
        dropDown: {
          scale: 1,
          duration: 0.5,
        },
      };
    case RESET_DROP_ANIM:
      return {
        ...state,
        dropDown: {
          scale: 0.9,
          duration: 0,
        },
      };
    default:
      return state;
  }
};

export default framerAnimationReducer;
