import { ACCESS_POST } from './types';

export const getAdminPrivilages = (depends) => (dispatch) => {
    dispatch({ type: ACCESS_POST, payload: depends });
};
