import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const [pageState, setPageState] = useState(["Sign in", "Home"]);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setPageState(["Profile", "Lessons"]);
                setUser(user);
            } else {
                setPageState(["Sign in", "Home"]); 
            }
        })
    }, [auth])

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }

    const styles = {
        listItem: `cursor-pointer py-3 text-md font-semibold 
        border-b-[3px] border-b-transparent`,
        listItemCurrent: "text-red-500 border-b-red-500"
    }

    return ( 
        <div className=" shadow-lg sticky top-0 z-40"
        style={{ backgroundColor: 'var(--background-color4)', color: 'var(--text-color)'}}
        >
            <header className="flex justify-between items-center max-w-6xl mx-auto pr-4 pl-4">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src="/logo.png" alt="" className="h-10 cursor-pointer inline" />
                    <h1 className="inline pl-1 text-sm font-semibold ">LingoMoose</h1>
                </div>
                <div>
                    <ul className="flex flex-row space-x-4 sm:space-x-10">

                        <li onClick={() => navigate("/")} className={`${styles.listItem}
                        ${pathMatchRoute("/") && styles.listItemCurrent}`}>{pageState[1]}</li>

                        <li onClick={() => navigate("/support-us")} className={`${styles.listItem}
                        ${pathMatchRoute("/support-us") && styles.listItemCurrent}`} >Support</li>

                        <li onClick={() => navigate(`${user? "/profile" : "/sign-in"}`)}  className={`${styles.listItem}
                        ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && styles.listItemCurrent}`}>{pageState[0]}</li>

                    </ul>
                </div>
                
            </header>
        </div>
    
     );
}
 
export default Header;