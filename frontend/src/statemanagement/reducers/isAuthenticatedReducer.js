import { Constants } from "../../utils/Constants";

const initialState = {
    jwt: localStorage.getItem(Constants.token),
  };

console.log(initialState)

const isAuthenticatedReducer = (state=initialState , action) => {
    if(action.type === "auth"){
        return action.payload
    }else{
        return {
            jwt : localStorage.getItem(Constants.token),
        }
    }
}
export default isAuthenticatedReducer