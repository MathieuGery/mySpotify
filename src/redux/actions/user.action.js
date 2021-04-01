import {userConstants} from '../constants/user.constants'
import {userService} from "../services/user.services";
import {logout} from "./auth.action";

export const getUser = (access_token) => dispatch => {
    dispatch(request());

    userService.getUser(access_token)
        .then(
            user => {
                dispatch(success(user));
            },
            error => {
                logout();
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: userConstants.GET_USER_REQUEST}
    }

    function success(user) {
        return {type: userConstants.GET_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.GET_USER_FAILED, error}
    }
}

export const getUserFavoriteTracks = (access_token) => dispatch => {
    dispatch(request());

    userService.getUserFavoriteTracks(access_token)
        .then(
            favorite_tracks => {
                dispatch(success(favorite_tracks));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: userConstants.GET_USER_FAV_TRACKS_REQUEST}
    }

    function success(favorite_tracks) {
        return {type: userConstants.GET_USER_FAV_TRACKS_SUCCESS, favorite_tracks}
    }

    function failure(error) {
        return {type: userConstants.GET_USER_FAV_TRACKS_FAILED, error}
    }
}

export const getPlaylists = (access_token) => dispatch => {
    dispatch(request());

    userService.getPlaylists(access_token)
        .then(
            playlists => {
                dispatch(success(playlists));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: userConstants.GET_PLAYLISTS_REQUEST}
    }

    function success(playlists) {
        return {type: userConstants.GET_PLAYLISTS_SUCCESS, playlists}
    }

    function failure(error) {
        return {type: userConstants.GET_PLAYLISTS_FAILED, error}
    }
}

export const getLikedTracks = (access_token) => dispatch => {
    dispatch(request());

    userService.getLikedTracks(access_token)
        .then(
            liked_tracks => {
                dispatch(success(liked_tracks));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: userConstants.GET_LIKED_TRACKS_REQUEST}
    }

    function success(liked_tracks) {
        return {type: userConstants.GET_LIKED_TRACKS_SUCCESS, liked_tracks}
    }

    function failure(error) {
        return {type: userConstants.GET_LIKED_TRACKS_FAILED, error}
    }
}
