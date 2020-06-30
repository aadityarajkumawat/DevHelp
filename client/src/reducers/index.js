import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import navbarReducer from './navbar';
import trendingReducer from './trending';
import postReducer from './getPost';
import adminPrivilagesReducer from './adminPrivilage';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    navbar: navbarReducer,
    trending: trendingReducer,
    post: postReducer,
    adminPrivilages: adminPrivilagesReducer,
});

export default rootReducer;
