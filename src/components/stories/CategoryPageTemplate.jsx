import { collection, limit, orderBy, query, where, getDocs, startAfter, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StoryItem from "./StoryItem";
import Spinner from "../ui/Spinner";
import { db } from "../../Firebase";
import { getAuth } from "firebase/auth";

const CategoryPageTemplate = ({title, whereInfo, levels, hideStudied}) => {
    
    let operand1 = whereInfo[0];
    let condition = whereInfo[1];
    let operand2 = whereInfo[2];

    const [userSelections, setUserSelections] = useState(null);
    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedStories, setLastFetchedStories] = useState(null);

    const auth = getAuth();

    useEffect(()=>{
        const user = auth.currentUser;
        if (user !== null) {
        // The user's ID, unique to the Firebase project.
            fetchSelectionList();
        } 
        // eslint-disable-next-line
    },[auth.currentUser])

    useEffect(()=>{
        async function fetchStories(){
            try {
                // get reference
                const listingRef = collection(db, "vietnamese");

                // create the query
                const q = query(listingRef, 
                where(operand1, condition, operand2),
                where('level', "in", levels.length === 0? ["newbie","elementary","intermediate","upperintermediate", "advanced","master"] : levels ), 
                orderBy("timestamp", "desc"), 
                limit(8));
      

                // execute the query
                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length -1];
                setLastFetchedStories(lastVisible);
                const stories = [];

                // filter out stories based on the user's selections
                querySnap.forEach((doc) => {
                    const storyId = doc.id;
                
                    if(userSelections && hideStudied && userSelections.studied.includes(storyId)) {
                        return;
                    }
                    
                    if(userSelections && false && userSelections.favorites.length > 0) {
                        if(!userSelections.favorites.includes(storyId)) {
                            return;
                        }
                    }
                
                    const storyData = doc.data();
                    const story = { id: storyId, data: storyData };
                    stories.push(story);
                });
                
                setStories(stories);
                setLoading(false);

            } catch(error) {
                toast.error(error);
                console.log(error);
            }
        };
        console.log(userSelections)
        fetchStories();
    },[operand1, condition, operand2, levels, hideStudied, userSelections])

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



    async function onFetchMoreStories(){
        try {
            const listingRef = collection(db, "vietnamese");
            const q = query(listingRef, 
                where(operand1, condition, operand2),
                where('level', "in", levels),
                orderBy("timestamp", "desc"),
                startAfter(lastFetchedStories),
                limit(4));
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length -1];
            setLastFetchedStories(lastVisible);
            const stories = [];
            querySnap.forEach((doc)=>{
                return stories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setStories((prevState) => [...prevState, ...stories]);
            setLoading(false);

        } catch(error) {
            toast.error(error);
            console.log(error);
        }
    }


    return ( 
        <div className="max-w-6xl mx-auto px-3">
            <h1 className="text-center text-3xl mt-6 mb-6 font-bold capitalize">{title === "everydaylife"? "Everyday Life" : title === 'funny'? "Funny Stories" : title }</h1>
            {loading ? (
                <Spinner />
            ) : (stories && stories.length) > 0 ? (
                <div>
                    <main>
                        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                            {stories.map((story) => (
                                <StoryItem 
                                    key={story.id}
                                    id={story.id}
                                    story={story.data}
                                />
                            ))}
                        </ul>
                    </main>
                    {lastFetchedStories && (
                        <div className="flex justify-center items-center">
                            <button 
                                onClick={onFetchMoreStories}
                                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 transition rounded duration-150 ease-in-out"
                            >Load more</button>
                        </div>
                    )}
                </div>
            ) : (
                <p> No {title.toLowerCase() === "everydaylife" ? "everyday life" : title ==="funny"? "funny stories" : title.toLowerCase()}</p>
            )}
        </div>
     );
}
 
export default CategoryPageTemplate;