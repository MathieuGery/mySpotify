import axios from 'axios';

export const userService = {
    getUser,
    getUserFavoriteTracks,
    getPlaylists,
    getLikedTracks,
    getLikedArtists,
    getRecentlyPlayedTracks
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

async function getPlaylists(access_token) {
    return axios.get(
        '\thttps://api.spotify.com/v1/me/playlists',
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw JSON.stringify(err.response.data.error.message);
    })
}

async function getLikedTracks(access_token) {
    return axios.get(
        '\thttps://api.spotify.com/v1/me/tracks',
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw JSON.stringify(err.response.data.error.message);
    })
}

async function getLikedArtists(access_token) {
    return axios.get(
        '\thttps://api.spotify.com/v1/me/following?type=artist',
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw JSON.stringify(err.response.data.error.message);
    })
}

async function getRecentlyPlayedTracks(access_token) {
    return axios.get(
        '\thttps://api.spotify.com/v1/me/player/recently-played',
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw JSON.stringify(err.response.data.error.message);
    })
}
