import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../Firebase';
import { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import AudioControls from '../components/AudioControls';
import StoryImage from '../components/StoryImage';
import Spinner from '../components/Spinner';

const Listen = () => {
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [ loading, setLoading] = useState(true);

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
        setLoading(false);
      }, [storyId]);

      console.log(storyId)


    return ( 
        <div>

         {(!loading && story) ? (
            
        <div className='max-w-2xl mx-auto min-h-[90vh] flex flex-col justify-between p-6 mt-6 rounded-lg shadow-md '
        style={{ backgroundColor: 'var(--background-color2)'}}>
         <StoryImage 
         level={story.level}
         title={story.title}
         image={story.imgUrls[0]}
         storyId={storyId}
         />
         <AudioControls 
         audioUrl={story.audioUrls[0]}         />
        </div>
         ) : (
         <div>
          <Spinner />
         </div>
         )}
        </div>
     );
}
 
export default Listen;