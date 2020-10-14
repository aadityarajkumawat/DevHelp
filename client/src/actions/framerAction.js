import {
  INIT_DROP_ANIM,
  INIT_EDIT_PROFILE_ANIM,
  RESET_DROP_ANIM,
  RESET_EDIT_PROFILE_ANIM,
} from "./types";

export const initEditProfileAnimation = () => (dispatch) => {
  dispatch({ type: INIT_EDIT_PROFILE_ANIM });
};

export const resetEditProfileAnim = () => (dispatch) => {
  dispatch({ type: RESET_EDIT_PROFILE_ANIM });
};

export const initDropAnim = () => (dispatch) => {
  dispatch({ type: INIT_DROP_ANIM });
};

export const resetDropAnim = () => (dispatch) => {
  dispatch({ type: RESET_DROP_ANIM });
};
