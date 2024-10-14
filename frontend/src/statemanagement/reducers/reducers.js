import { combineReducers } from "redux";
import isAuthenticatedReducer from "./isAuthenticatedReducer";

const reducers = combineReducers ({
    isAuthReducer : isAuthenticatedReducer
})
export default reducers