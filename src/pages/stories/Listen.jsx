import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../../Firebase';
import { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import AudioControls from '../../components/stories/AudioControls';
import StoryImage from '../../components/stories/StoryImage';
import Spinner from '../../components/ui/Spinner';

const Listen = () => {
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [ loading, setLoading] = useState(true);

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



    return ( 
        <>
          <div className=' w-full min-h-[90vh] mt-8  border-box flex flex-col items-center justify-center'>
    

          {(!loading && story) ? (
              
          <div className='max-w-2xl flex flex-col justify-between p-6  rounded-lg shadow-md relative'
          style={{ backgroundColor: 'var(--background-color2)'}}>
     
            <StoryImage 
            level={story.level}
            title={story.title}
            image={story.imgUrls[0]}
            storyId={storyId}
            />  
      
          
       
            <AudioControls 
            audioUrl={story.audioUrls[0]} 
               
            />
       
          
          </div>
          ) : (
          <div>
            <Spinner />
          </div>
          )}
          </div>
        </>
     );
}
 
export default Listen;