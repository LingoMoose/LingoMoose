import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../Firebase';
import { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import Reading from '../components/Reading';

const Read = () => {
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(storyId)
    useEffect(() => {
        async function fetchStory() {
          const docRef = doc(db, "vietnamese", storyId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setStory(docSnap.data());
            setLoading(false);
          }
        }
        fetchStory();

      }, [storyId]);

      console.log(story)
      

    return ( 
        <div>
         {story ? (
        <div>
         <h2>{story.storyBody}</h2>
         <h2>{story.audioUrls[0]}</h2>
         <Reading 
         audioUrl={story.audioUrls[0]}
         text={story.storyBody}
         
         />
        </div>
         ) : (
         <div>Loading</div>)}
        </div>
     );
}
 
export default Read;

