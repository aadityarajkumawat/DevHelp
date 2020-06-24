import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg) => (dispatch) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, id } });

    // Remove alert after 5s timer
    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, 5000);
};
