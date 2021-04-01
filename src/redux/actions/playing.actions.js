import {playingConstants} from '../constants/playing.constants'
import {playingServices} from "../services/playing.services";

export const getPlayingTrack = (access_token) => dispatch => {
    dispatch(request());

    playingServices.getCurrentlyPlaying(access_token)
        .then(
            data => {
                dispatch(success(data.item, data.is_playing, data.progress_ms));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: playingConstants.GET_PLAYING_TRACK_REQUEST}
    }

    function success(playing_track, is_playing, progress_ms) {
        return {type: playingConstants.GET_PLAYING_TRACK_SUCCESS, playing_track, is_playing, progress_ms}
    }

    function failure(error) {
        return {type: playingConstants.GET_PLAYING_TRACK_FAILURE, error}
    }
}

export const setPlayingTrack = (access_token, playingTrack) => dispatch => {
    dispatch(request(playingTrack));

    playingServices.playNewTrack(access_token, playingTrack)
        .then(
            data => {
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: playingConstants.SET_PLAYING_TRACK_FAILURE, playingTrack}
    }

    function failure(error) {
        return {type: playingConstants.SET_PLAYING_TRACK_FAILURE, error}
    }
}

export const play = (access_token) => dispatch => {
    playingServices.play(access_token)
        .then(
            data => {
                dispatch({
                    type: playingConstants.PLAY,
                });
            },
            error => {
//                dispatch(failure(error.toString()));
            }
        );
}

export const pause = (access_token) => dispatch => {
    playingServices.pause(access_token)
        .then(
            data => {
                dispatch({
                    type: playingConstants.PAUSE,
                });
            },
            error => {
//                dispatch(failure(error.toString()));
            }
        );
}