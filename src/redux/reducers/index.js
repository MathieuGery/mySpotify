import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import userReducer from "./user.reducers";
import playingReducer from "./playing.reducer";

export default combineReducers({
    authReducer: authReducer,
    userReducer: userReducer,
    playingReducer: playingReducer
});
