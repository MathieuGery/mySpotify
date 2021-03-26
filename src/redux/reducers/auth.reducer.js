import { authConstants } from '../constants/auth.constants'
import Cookies from 'js-cookie'

let access_token = Cookies.get('access_token');
const initialState = access_token ? { loggedIn: true, access_token } : {};
console.log(initialState);

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN:
            return {
                ...state,
                access_token: action.access_token,
                loggedIn: true,
            };
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state;
    }
}