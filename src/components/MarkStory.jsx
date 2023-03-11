import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
// import { db } from "../Firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";

const MarkStory = ({storyId}) => {
    const [studied, setStudied] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [uid, setUid] = useState(null);
    

    const auth = getAuth();

    useEffect(()=>{
        const user = auth.currentUser;
        if (user !== null) {
        // The user's ID, unique to the Firebase project.
        setUid(user.uid);
        } else {
            setUid(null)
        }
    },[auth.currentUser])

    
console.log(uid)

    return ( 
        <div className="flex flex-row items-end bg-gray-200 px-4 rounded-lg border-2 border-gray-300">
            <div className="relative w-full flex flex-col justify-center items-center m-2 mx-4">
            <div 
                onClick={()=>setStudied(!studied)}
                className={`border-2 p-[6px] text-xl rounded-full cursor-pointer border-gray-400 text-gray-400 ${studied && "border-green-400 text-white bg-green-400"}`}
            >
                {studied? (
                    <ImCheckmark />
                ) : (
                    <ImCheckmark2 />
                )
                }
            </div>
            <p>Studied</p>
            </div>
            <div className="relative w-full flex flex-col justify-center items-center m-2 mx-4">
            <div 
                onClick={()=>setFavorite(!favorite)}
                className={` text-4xl rounded-full cursor-pointer text-gray-400 ${favorite && "text-yellow-400"}`}
            >
                {favorite? (
                    <HiStar />
                ) : (
                    <HiOutlineStar />
                )
                }
                
            </div>
            <p>Star</p>  
            </div>
        </div>
     );
}
 
export default MarkStory;