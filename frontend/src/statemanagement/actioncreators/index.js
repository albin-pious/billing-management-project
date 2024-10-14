export const enableMenu = (condition) => {
    return (dispatch) => {
        dispatch({
            type : "menuenable",
            payload : condition
        })
    }
}

export const isAuthenticated = (value) => {
    return (dispatch) => {
        dispatch({
            type : "auth",
            payload : value
        })
    }
}