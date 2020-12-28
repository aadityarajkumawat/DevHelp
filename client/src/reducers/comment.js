import { GET_COMMENTS, POST_COMMENT } from "../actions/types";

const initialState = {
  commenting: false,
  cmts: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENT:
      return { ...state, commenting: action.payload };
    case GET_COMMENTS:
      return { ...state, cmts: action.payload };
    default:
      return state;
  }
};

export default commentReducer;
