import { authConstants } from '../constants/auth.constants'

let auth = JSON.parse(localStorage.getItem('auth'));
const initialState = auth ? { loggedIn: true, auth } : {};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggingIn: false,
                data: action.auth.data,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
            };
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state;
    }
}