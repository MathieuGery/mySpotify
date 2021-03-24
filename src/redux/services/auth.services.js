export const userService = {
    login,
    logout,
};

function login() {
    const body = {
        response_type: 'code',
        client_id: '',
        scopes: 'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000'
    }
    return `https://accounts.spotify.com/authorize?`+
    `client_id=${body.client_id}&redirect_uri=${encodeURIComponent(body.redirect_uri)}`+
    `&scope=${encodeURIComponent(body.scopes)}&response_type=${body.response_type}&show_dialog=false`;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}