import { collection, query, where, orderBy, getDocs, limit, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoryItem from "./StoryItem";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { UseAuthStatus } from "../../hooks/UseAuthStatus";

const PreviewSectionTemplate = ({whereInfo, caption, link, linkText, levels, hideStudied}) => {
    let operand1 = whereInfo[0];
    let condition = whereInfo[1];
    let operand2 = whereInfo[2];
    const [userSelections, setUserSelections] = useState(null);
    const [stories, setStories] = useState(null);
  

    const auth = getAuth();
    const { LoggedIn } = UseAuthStatus;

    useEffect(()=>{
        if (LoggedIn) {
            fetchSelectionList();
        } 
        // eslint-disable-next-line
    },[LoggedIn])

    useEffect(()=>{
        async function fetchStories(){
            try {
                // get reference
                const storiesRef = collection(db, "vietnamese");

                // create the query
                const q = query(
                  storiesRef,
                  where(operand1, condition, operand2),
                  where('level', "in", levels.length === 0? ["newbie","elementary","intermediate","upperintermediate", "advanced","master"] : levels), 
                  orderBy("timestamp", "desc"),
                  limit(4)
                  
                );
                // execute the query
                const querySnap = await getDocs(q);
                const stories = [];

                // filter out stories based on the user's selections
                querySnap.forEach((doc) => {
                  const storyId = doc.id;
                  const storyData = doc.data();
                  
                  if(userSelections && hideStudied && userSelections.studied.includes(storyId)) {
                      return;
                  }
                  
                  if(userSelections && false && userSelections.favorites.length > 0) {
                      if(!userSelections.favorites.includes(storyId)) {
                          return;
                      }
                  }

                    stories.push({
                      id: doc.id,
                      data: storyData,
                    });
  


                });
      
                setStories(stories);
              } catch (error) {
                console.log(error);
              }
            }
            
            fetchStories();
          }, [operand1, condition, operand2, levels, userSelections, hideStudied]);


          async function fetchSelectionList() {
            const docRef = doc(db, "vietnameseUserSelections", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
          
            if (docSnap.exists()) {
              const selectionListData = docSnap.data();
              setUserSelections({
                favorites: selectionListData.hasOwnProperty("favorites") ? selectionListData["favorites"] : [],
                studied: selectionListData.hasOwnProperty("studied") ? selectionListData["studied"] : [],
              });

            } else {
              setUserSelections({
                favorites: [],
                studied: [],
              });
            }
          };
    
    
    return ( 
        <div>
            {stories && stories.length > 0 && (
                <div className="m-2 mb-6 "
                >
                    <h2 className="px-3 text-2xl mt-6 font-semibold">{caption}</h2>
                    <Link to={link} >
                        <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more {linkText}</p>
                    </Link>
                    <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {stories.map((story)=>(
                            <StoryItem
                                key={story.id}
                                story={story.data}
                                id={story.id}
                            />
                        ))}
                    </ul>
                </div>   
            )}
        </div>
     );
}
 
export default PreviewSectionTemplate;