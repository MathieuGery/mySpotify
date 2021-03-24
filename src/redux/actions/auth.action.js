import { authConstants } from '../constants/auth.constants'
import { userService } from "../services/auth.services";

export const login = () => dispatch => {
    const request = () => { return { type: authConstants.LOGIN_REQUEST} }
    const success = (auth) => { return { type: authConstants.LOGIN_SUCCESS, auth } }
    const failure = () => { return { type: authConstants.LOGIN_FAILURE} }

    return dispatch => {
        dispatch(request());

        userService.login()
            .then(
                auth => {
                    dispatch(success(auth));
                    //history.push('/');
                },
                () => {
                    dispatch(failure());
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

export const logout = () => dispatch => {
    userService.logout();
    dispatch({
        type: authConstants.LOGOUT
    })
}