import { playlistsConstants } from '../constants/playlists.constants'

const initialState = {playlists :{},};

export default function playlistsReducer(state = initialState, action) {
    switch (action.type) {
        case playlistsConstants.GET_PLAYLISTS:
            return {
                ...state,
                playlists: action.data
            };
        default:
            return state;
    }
}
