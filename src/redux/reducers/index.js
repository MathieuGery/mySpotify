import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from "./user.reducers";
import playlistsReducer from "./playlists.reducer";
import playingReducer from "./playing.reducer";

export default combineReducers({
    authReducer: authReducer,
    userReducer: userReducer,
    playlistsReducer: playlistsReducer,
    playingReducer: playingReducer
});
