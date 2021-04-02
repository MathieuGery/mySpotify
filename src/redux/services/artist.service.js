import axios from 'axios';

export default async function getArtistProfile(access_token, id) {
    return axios.get(
        '\thttps://api.spotify.com/v1/artists/' + id,
        {
            headers: {'Authorization': `Bearer ${access_token}`}
        }
    ).then((res) => {
        return res.data;
    }).catch((err) => {
        throw JSON.stringify(err.response.data.error.message);
    })
}
