import { DISPATCH_POPUP, REMOVE_POPUP } from "./types";

export const dispatchPopup = (heading, message) => (dispatch) => {
  dispatch({ type: DISPATCH_POPUP, payload: { heading, message } });
};

export const removePopup = () => (dispatch) => {
  dispatch({ type: REMOVE_POPUP });
};
