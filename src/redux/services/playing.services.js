import axios from 'axios';

export const playingServices = {
    getCurrentlyPlaying,
    pause,
    play,
    playNewTrack,
};

function getCurrentlyPlaying(access_token) {
    return axios.get(
        "https://api.spotify.com/v1/me/player",
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw err.response.data.error.message;
    })
}

function pause(access_token) {
    return axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((err) => {
        console.log(err.response.data);
        throw err.response.data.error.message;
    })
}

function play(access_token) {
    return axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((err) => {
        console.log(err.response.data);
        throw err.response.data.error.message;
    })
}

function playNewTrack(access_token, context_uri) {
    return axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
            uris: [context_uri],
        },
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((err) => {
        console.log(err.response.data);
        throw err.response.data.error.message;
    })
}