import { ACCESS_POST, CLEAN_ADMIN_PRIVILAGES } from "./types";

export const getAdminPrivilages = (depends) => (dispatch) => {
  dispatch({ type: ACCESS_POST, payload: depends });
};

export const cleanAdminPrivilages = () => (dispatch) => {
  dispatch({ type: CLEAN_ADMIN_PRIVILAGES });
};
