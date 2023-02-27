import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoryItem from "./StoryItem";
import { db } from "../Firebase";

const PreviewSectionTemplate = ({whereInfo, caption, link, linkText, levels}) => {
    let operand1 = whereInfo[0];
    let condition = whereInfo[1];
    let operand2 = whereInfo[2];

    
    const [stories, setStories] = useState(null);

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
                querySnap.forEach((doc) => {
                  return stories.push({
                    id: doc.id,
                    data: doc.data(),
                  });
                });
                setStories(stories);
              } catch (error) {
                console.log(error);
              }
            }
            fetchStories();
          }, [operand1, condition, operand2, levels]);
    
    
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