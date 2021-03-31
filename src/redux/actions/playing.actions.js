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
    dispatch({
        type: playingConstants.SET_PLAYING_TRACK,
        playing_track: playingTrack
    });
}

export const play = (access_token) => dispatch => {
    dispatch({
        type: playingConstants.PLAY,
    });
}

export const pause = (access_token) => dispatch => {
    dispatch({
        type: playingConstants.PAUSE,
    });
}