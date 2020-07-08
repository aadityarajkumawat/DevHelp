import { TOGGLE_SLIDE_MENU } from './types';

export const toggleSlideMenu = (oo) => (dispatch) => {
    dispatch({ type: TOGGLE_SLIDE_MENU, payload: oo });
};
