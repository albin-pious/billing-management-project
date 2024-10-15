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

export const addProduct = ({ productId, quantity, price }) => ({
    type: 'ADD_PRODUCT',
    payload: { productId, quantity, price }
});
  
export const removeProduct = (productId) => ({
    type: 'REMOVE_PRODUCT',
    payload: productId
});
  
export const updateQuantity = ({productId, quantity}) => ({
    type: 'UPDATE_QUANTITY',
    payload: { productId, quantity }
});

export const clearSelectedProducts = () => ({
    type: 'CLEAR_SELECTED_PRODUCTS'
});