import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

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
        <div className="bg-white border-b shadow-sm sticky top-0 z-50">
            <header className="flex justify-between items-center max-w-6xl mx-auto">
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src="/logo.png" alt="" className="h-10 cursor-pointer inline" />
                    <h1 className="inline pl-1">Mimoville</h1>
                </div>
                <div>
                    <ul className="flex flex-row space-x-10">
                        <li onClick={() => navigate("/")} className={`${styles.listItem}
                        ${pathMatchRoute("/") && styles.listItemCurrent}`}>Home</li>
                        <li onClick={() => navigate("/offers")} className={`${styles.listItem}
                        ${pathMatchRoute("/offers") && styles.listItemCurrent}`} >Offers</li>
                        <li onClick={() => navigate("/sign-in")}  className={`${styles.listItem}
                        ${pathMatchRoute("/sign-in") && styles.listItemCurrent}`}>Sign In</li>
                    </ul>
                </div>
                
            </header>
        </div>
    
     );
}
 
export default Header;