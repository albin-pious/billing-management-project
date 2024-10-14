/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"

const ProtectedRouter = ({ isLoggedIn, children })=>{
    if(!isLoggedIn){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRouter;