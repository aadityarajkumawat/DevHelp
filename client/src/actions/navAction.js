import { DISPLAY_NAVBAR, REMOVE_NAVBAR } from './types';

export const showNav = () => (dispatch) => {
    dispatch({ type: DISPLAY_NAVBAR });
};

export const removeNav = () => (dispatch) => {
    dispatch({ type: REMOVE_NAVBAR });
};
