import {userConstants} from '../constants/user.constants'
import {userService} from "../services/user.services";

export const getUser = (access_token) => dispatch => {
    dispatch(request());

    userService.getUser(access_token)
        .then(
            user => {
                dispatch(success(user));
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );

    function request() {
        return {type: userConstants.GET_USER_REQUEST}
    }

    function success(user) {
        return {type: userConstants.GET_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.GET_USER_FAILED, error}
    }
}