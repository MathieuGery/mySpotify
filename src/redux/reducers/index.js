import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from "./user.reducers";
import playlistsReducer from "./playlists.reducer";

export default combineReducers({
    authReducer: authReducer,
    userReducer: userReducer,
    playlistsReducer: playlistsReducer
});
