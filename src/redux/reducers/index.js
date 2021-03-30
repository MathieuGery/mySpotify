import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import playlistsReducer from "./playlists.reducer";

export default combineReducers({
    authReducer: authReducer,
    playlistsReducer: playlistsReducer
});
