const initialState = [];

const selectedProductsReducer = ( state = initialState, action )=>{
    switch(action.type){
        case 'ADD_PRODUCT':
            const { productId, quantity, price } = action.payload;
            const existingProduct = state.find(product => product.productId === productId);
            if(existingProduct){
                return state.map(product => 
                    product.productId === productId ? { ...product, quantity } : product
                );
            }else{
                return [...state, { productId, quantity, price }];
            }
        case "REMOVE_PRODUCT":
            return state.filter(product => product.productId !== action.payload);
        case "UPDATE_QUANTITY":
            return state.map(product =>
                product.productId === action.payload.productId
                ? { ...product, quantity: action.payload.quantity }
                : product
            );
        case 'CLEAR_SELECTED_PRODUCTS':
            return [];
        default:
            return state;
    }
}

export default selectedProductsReducer;