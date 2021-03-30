import axios from 'axios';

export const userService = {
    getUser,
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
        console.log(err.response.data.error.message)
        throw JSON.stringify(err.response.data.error.message);
    })
}