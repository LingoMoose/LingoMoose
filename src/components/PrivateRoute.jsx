import { Outlet, Navigate } from "react-router";
import { UseAuthStatus } from "../hooks/UseAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = UseAuthStatus();
    if(checkingStatus){
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/landing" /> 

}
 
export default PrivateRoute;