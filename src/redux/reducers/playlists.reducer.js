import { playlistsConstants } from '../constants/playlists.constants'

const initialState = {playlists :{},};

export default function playlistsReducer(state = initialState, action) {
    switch (action.type) {
        case playlistsConstants.GET_PLAYLISTS_REQUEST:
            return {
                loading: true,
            };
        case playlistsConstants.GET_PLAYLISTS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case playlistsConstants.GET_PLAYLISTS_SUCCESS:
            return {
                playlists: action.playlists,
                loading: false,
            };
        default:
            return state;
    }
}
