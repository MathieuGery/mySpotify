import {userConstants} from '../constants/user.constants'

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
        case userConstants.GET_LIKED_TRACKS_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_LIKED_TRACKS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_LIKED_TRACKS_SUCCESS:
            return {
                ...state,
                error: null,
                liked_tracks: action.liked_tracks,
                loading: false,
            };
        case userConstants.GET_LIKED_ARTISTS_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_LIKED_ARTISTS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_LIKED_ARTISTS_SUCCESS:
            return {
                ...state,
                error: null,
                liked_artists: action.liked_artists,
                loading: false,
            };
        case userConstants.GET_RECENTLY_PLAYED_TRACKS_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_RECENTLY_PLAYED_TRACKS_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_RECENTLY_PLAYED_TRACKS_SUCCESS:
            return {
                ...state,
                error: null,
                recently_played_tracks: action.recently_played_tracks,
                loading: false,
            };
        default:
            return state;
    }
}
