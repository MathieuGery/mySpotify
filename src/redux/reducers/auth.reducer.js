export default function authReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: (action.token ? action.token : 'NO TOKEN')
            }
        default:
            return state
    }
}