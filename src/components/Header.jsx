import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [pageState, setPageState] = useState("Sign in");
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setPageState("Profile");
            } else {
                setPageState("Sign in"); 
            }
        })
    }, [auth])

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }

    const styles = {
        listItem: `cursor-pointer py-3 text-sm font-semibold 
        text-gray-400 border-b-[3px] border-b-transparent`,
        listItemCurrent: "text-black border-b-red-500"
    }

    return ( 
        <div className="bg-white border-b shadow-sm sticky top-0 z-40">
            <header className="flex justify-between items-center max-w-6xl mx-auto pr-4 pl-4">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src="/logo.png" alt="" className="h-10 cursor-pointer inline" />
                    <h1 className="inline pl-1 text-sm font-semibold ">Mimoville</h1>
                </div>
                <div>
                    <ul className="flex flex-row space-x-10">

                        <li onClick={() => navigate("/")} className={`${styles.listItem}
                        ${pathMatchRoute("/") && styles.listItemCurrent}`}>Home</li>

                        <li onClick={() => navigate("/offers")} className={`${styles.listItem}
                        ${pathMatchRoute("/offers") && styles.listItemCurrent}`} >Offers</li>

                        <li onClick={() => navigate("/profile")}  className={`${styles.listItem}
                        ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && styles.listItemCurrent}`}>{pageState}</li>

                    </ul>
                </div>
                
            </header>
        </div>
    
     );
}
 
export default Header;