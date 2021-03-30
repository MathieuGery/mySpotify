import {playlistsConstants} from "../constants/playlists.constants";
import {playlistsService} from "../services/playlists.services";

export const getPlaylists = (access_token) => dispatch => {
    dispatch(request());

    playlistsService.getPlaylists(access_token)
        .then(
            playlists => {
                dispatch(success(playlists));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: playlistsConstants.GET_PLAYLISTS_REQUEST}
    }

    function success(playlists) {
        return {type: playlistsConstants.GET_PLAYLISTS_SUCCESS, playlists}
    }

    function failure(error) {
        return {type: playlistsConstants.GET_PLAYLISTS_FAILED, error}
    }
}
