import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
});

export default rootReducer;
