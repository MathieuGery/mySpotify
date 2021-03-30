import { userConstants } from '../constants/user.constants'

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_USER_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GET_USER_FAILED:
            return {
                error: action.error,
                loading: false,
            };
        case userConstants.GET_USER_SUCCESS:
            return {
                user: action.user,
                loading: false,
            };
        default:
            return state;
    }
}