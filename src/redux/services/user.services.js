import axios from 'axios';

export const userService = {
    getUser,
    getUserFavoriteTracks
};

async function getUser(access_token) {
    return axios.get(
        'https://api.spotify.com/v1/me',
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw err.response.data.error.message;
    })
}

async function getUserFavoriteTracks(access_token) {
    const type = 'artists';

    return axios.get(
        `https://api.spotify.com/v1/me/top/${type}?time_range=medium_term&limit=6`,
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw err.response.data.error.message;
    })
}