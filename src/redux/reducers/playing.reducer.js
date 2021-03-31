import { playingConstants } from '../constants/playing.constants'

export default function playingReducer(state = {}, action) {
    switch (action.type) {
        case playingConstants.GET_PLAYING_TRACK_REQUEST:
            return {
                ...state,
            };
        case playingConstants.GET_PLAYING_TRACK_SUCCESS:
            return {
                playing_track: action.playing_track,
                is_playing: action.is_playing,
                progress_ms: action.progress_ms
            };
        case playingConstants.GET_PLAYING_TRACK_FAILURE:
            return {
                error: action.error,
            };
        case playingConstants.SET_PLAYING_TRACK:
            return {
                playing_track: action.playing_track,
                is_playing: true,
                progress_ms: 0
            };
        case playingConstants.PLAY:
            return {
                ...state,
                is_playing: true
            };
        case playingConstants.PAUSE:
            return {
                ...state,
                is_playing: false
            };
        default:
            return state;
    }
}