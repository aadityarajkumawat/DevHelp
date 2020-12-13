import {
  GET_POST,
  SET_CURRENT_POST,
  CLEAR_POST,
  GET_USER_POSTS,
  UPLOAD_POST,
  GET_SAVED_POST,
  TOGGLE_SAVE_POST,
  LIKE_POST,
  GET_LIKED_POST,
  CLEAR_LIKED_STATUS,
  GET_POST_ID,
  CLEAR_POST_ID,
  SET_LOADING_POST_TRUE,
  RESET_IMAGE_UPLOAD,
  CLEAN_POST_ACTION,
  DELETE_POST,
  REALLY_GET_ALL_POSTS,
} from "../actions/types";

const initialState = {
  loadingPost: true,
  openedPost: {}, //this is current post which is displayed
  currentPost: "", //this will just be a string of postID
  userPosts: [],
  loadingUserPosts: true,
  uploadedStatus: false,
  savedPosts: [], //this will get saved posts from backend
  status: "",
  likedStatus: "",
  likedPost: [], //this will get liked posts from backend
  reallyAllPosts: [],
  postID: "",
  imageUploaded: false,
  arePosts: true, //check weather are there some posts
  deletedStatus: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case REALLY_GET_ALL_POSTS:
      return {
        ...state,
        reallyAllPosts: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        deletedStatus: action.payload,
      };
    case RESET_IMAGE_UPLOAD:
      return {
        ...state,
        imageUploaded: false,
      };
    case SET_LOADING_POST_TRUE: {
      return {
        ...state,
        loadingPost: true,
      };
    }
    case CLEAR_POST_ID:
      return {
        ...state,
        postID: "",
      };
    case GET_POST_ID:
      return {
        ...state,
        postID: action.payload,
        imageUploaded: true,
      };
    case CLEAR_LIKED_STATUS:
      return {
        ...state,
        likedStatus: action.payload,
      };
    case GET_LIKED_POST:
      return {
        ...state,
        likedPost: action.payload,
      };
    case LIKE_POST:
      return {
        ...state,
        likedStatus: action.payload,
      };
    case TOGGLE_SAVE_POST:
      return {
        ...state,
        status: action.payload,
      };

    case GET_SAVED_POST:
      return {
        ...state,
        savedPosts: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        openedPost: action.payload,
        loadingPost: false,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case CLEAR_POST:
      return {
        ...state,
        openedPost: {},
        currentPost: "",
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        loadingUserPosts: false,
        arePosts: action.payload.length > 0 ? true : false,
      };
    case UPLOAD_POST:
      return {
        ...state,
        uploadedStatus: true,
      };
    case CLEAN_POST_ACTION:
      return {
        ...state,
        loadingPost: true,
        openedPost: {},
        currentPost: "",
        userPosts: [],
        loadingUserPosts: true,
        uploadedStatus: false,
        savedPosts: [],
        status: "",
        likedStatus: "",
        likedPost: [],
        postID: "",
        imageUploaded: false,
        arePosts: true,
      };
    default:
      return state;
  }
};

export default postReducer;
