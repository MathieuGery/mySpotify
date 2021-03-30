import Cookies from 'js-cookie'

export const authServices = {
    login,
    logout,
};

function login() {

}

function logout() {
    // remove user from cookies to log user out
    Cookies.remove('access_token', {path: '/'});
}