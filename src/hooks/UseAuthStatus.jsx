import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const UseAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setLoggedIn(true);
            }
            setCheckingStatus(false)
        })
    }, [])

    return {loggedIn, checkingStatus};
}
 
export { UseAuthStatus };