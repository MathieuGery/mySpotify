import {authConstants} from '../constants/auth.constants'
import {userService} from "../services/auth.services";

export const login = (access_token) => dispatch => {
    dispatch({
        type: authConstants.LOGIN,
        access_token: access_token,
    });
}

export const logout = () => dispatch => {
    userService.logout();
    dispatch({
        type: authConstants.LOGOUT
    })
}