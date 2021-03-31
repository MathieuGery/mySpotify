import axios from 'axios';

export const playingServices = {
    getCurrentlyPlaying
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