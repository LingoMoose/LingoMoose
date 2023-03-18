import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const MarkStory = ({storyId}) => {
    const [studied, setStudied] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [uid, setUid] = useState(null);
    const [userSelections, setUserSelections] = useState(null);

    const auth = getAuth();

    console.log(userSelections)

    useEffect(()=>{
        const user = auth.currentUser;
        if (user !== null) {
        // The user's ID, unique to the Firebase project.
            setUid(user.uid);
            fetchSelectionList();
        } else {
            setUid(null)
        }
        // eslint-disable-next-line
    },[auth.currentUser])

    useEffect(() => {
        if (userSelections) {
          setUserSelections(prevState => ({
            ...prevState,
            favorites: favorite
              ? [...new Set([...prevState.favorites, storyId])]
              : prevState.favorites.filter(id => id !== storyId),
            studied: studied
              ? [...new Set([...prevState.studied, storyId])]
              : prevState.studied.filter(id => id !== storyId),
          }));
        }
        // eslint-disable-next-line
      }, [favorite, studied]);


    useEffect(() => {
        if (uid && userSelections !== null) {
            const selectionsListRef = doc(db, "vietnameseUserSelections", auth.currentUser.uid);
            setDoc(selectionsListRef, userSelections );
        }
        // eslint-disable-next-line
    }, [userSelections]);

    async function fetchSelectionList() {
        const docRef = doc(db, "vietnameseUserSelections", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const selectionListData = docSnap.data();
          setUserSelections({
            favorites: selectionListData.hasOwnProperty("favorites") ? selectionListData["favorites"] : [],
            studied: selectionListData.hasOwnProperty("studied") ? selectionListData["studied"] : [],
          });
          setFavorite(selectionListData.hasOwnProperty("favorites") && selectionListData["favorites"].includes(storyId));
          setStudied(selectionListData.hasOwnProperty("studied") && selectionListData["studied"].includes(storyId));
        } else {
          setUserSelections({
            favorites: [],
            studied: [],
          });
        }
      };

    



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