import { combineReducers } from "redux";
import isAuthenticatedReducer from "./isAuthenticatedReducer";
import selectedProductsReducer from "./selectedProductsReducer";

const reducers = combineReducers ({
    isAuthReducer : isAuthenticatedReducer,
    selectedProducts : selectedProductsReducer,
})
export default reducers