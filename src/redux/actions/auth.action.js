export const setToken = (token) => dispatch => {
    dispatch({
        type: 'SET_TOKEN',
        token: token
    })
}