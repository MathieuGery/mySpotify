
import axios from 'axios';

export const playlistsService = {
    getPlaylists,
};

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
