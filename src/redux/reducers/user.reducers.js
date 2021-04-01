import { userConstants } from '../constants/user.constants'

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_USER_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_USER_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_USER_SUCCESS:
            return {
                ...state,
                error: null,
                user: action.user,
                loading: false,
            };
        case userConstants.GET_USER_FAV_TRACKS_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_USER_FAV_TRACKS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_USER_FAV_TRACKS_SUCCESS:
            return {
                ...state,
                error: null,
                favorite_tracks: action.favorite_tracks,
                loading: false,
            };
        case userConstants.GET_PLAYLISTS_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_PLAYLISTS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_PLAYLISTS_SUCCESS:
            return {
                ...state,
                error: null,
                playlists: action.playlists,
                loading: false,
            };
        default:
            return state;
    }
}
