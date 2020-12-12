import {
  PROFILE_PHOTO,
  RESET_PROFILE_PHOTO,
  GET_PROFILE,
  TOGGLE_EDIT_PROFILE_BACKDROP,
  EDIT_PROFILE,
  CLEAN_PROFILE_ACTION,
  SET_SAVING_STATUS,
  GET_THAT_PROFILE,
} from "../actions/types";

const initialState = {
  profile: {},
  recievedProfile: false,
  backdrop: false,
  editProfileRes: false,
  savedStatus: {
    color: "#000",
    cursor: "pointer",
  },
  thatProfile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload,
        editProfileRes: true,
        savedStatus: { color: "#000", cursor: "pointer" },
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
    case CLEAN_PROFILE_ACTION:
      return {
        ...state,
        profile: {},
        recievedProfile: false,
        backdrop: false,
        editProfileRes: false,
      };
    case SET_SAVING_STATUS:
      return {
        ...state,
        savedStatus: { color: "#828282", cursor: "no-drop" },
      };
    case GET_THAT_PROFILE:
      return {
        ...state,
        thatProfile: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
