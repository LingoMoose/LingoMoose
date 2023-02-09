import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { ImBackward } from 'react-icons/im';


const Reader = ({ text, audioUrl, translation }) => {

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  
  useEffect(()=>{
    setLoading(false);
  },[])

  const handleSentenceClick = (sentence) => {
    const sentenceIndex = text.split(/(?<=[.?!])/).indexOf(sentence);
    const selectedSentenceTranslation = translation.split(/(?<=[.?!])/)[sentenceIndex];
    setSelectedTranslation(selectedSentenceTranslation);
  };

    const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleWordHover = (word) => {
    // Make an API call to get the translation for the word
    // Replace the mock data with actual data from the API call
    // const translation = 'This is a translation for the word.';
  };

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));
  }, [audio]);

  useEffect(()=>{
    audio.playbackRate = playbackRate;
  },[playbackRate, audio])



  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audio.playbackRate = playbackRate;
      audio.pause();
    } else {
      audio.playbackRate = playbackRate;
      audio.play();
    }
  };

  const rewind = () => {
    audio.currentTime -= 5;
  };

  const restart = () => {
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const changeRate = (playbackRate) => {
    switch(playbackRate) {
        case 0.5:
            setPlaybackRate(0.75);
            break;
        case 0.75:
            setPlaybackRate(1.0);
            break;
        case 1:
            setPlaybackRate(1.25);
            break;
        case 1.25:
            setPlaybackRate(1.50);
            break;
        case 1.50:
            setPlaybackRate(0.5);
            break;
        default:
            setPlaybackRate(1);
      }
      audio.playbackRate = playbackRate;
  };

  return (
    <div className="pt-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
        {!loading && (
        <div className="relative top-0 left-0 w-full h-12 p-2 text-white font-medium bg-gray-900 flex items-center justify-center">
            <div className="flex justify-center cursor-pointer" onClick={toggleTranslation}>
            <div className=''>{showTranslation ? selectedTranslation : 'Show Translation'}</div>
            </div>
        </div>
        )}
  
    
        <div className='p-4 bg-gray-200 rounded-lg'>
        {text.split(/(?<=[.?!])/).map((sentence, index) => (
            <p 
                key={index}
                className="inline text-base leading-loose cursor-pointer hover:underline
                font-serif  text-gray-700 pt-4 pb-4 "
                onClick={() => handleSentenceClick(sentence)}

                onMouseOver={() => handleWordHover(sentence)}
            >
                {sentence}
            </p>
        ))}
        </div>
        <div className='mt-4 flex justify-center flex-col items-center'>
        <div>
        <div className="flex justify-center">
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={rewind}
            >
            <div className='h-8 w-8 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                <ImBackward className="absolute text-white left-[7px] text-md" />  
            </div>
      
            
            {t('')}
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={togglePlay}
            >
            {isPlaying ? (
                <>
                <div className='h-10 w-10 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                    <FaPause className=" absolute text-2xl text-white  left-2" />
                </div>
                {t('')}
                </>
            ) : (
                <>
                <div className='h-10 w-10 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                    <FaPlay className=" absolute text-2xl text-white  left-[10px]" />
                </div>
                
                {t('')}
                </>
            )}
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={restart}
            >
            <div className='h-8 w-8 relative flex justify-flexend items-center bg-red-500 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                <FaRedo className="absolute text-white left-2 text-sm" />  
            </div>
            {t('')}
            </button>
        </div>
        </div>
  
          <button onClick={() => changeRate(playbackRate)}>
            {playbackRate}x
          </button>

        </div>
    </div>
  );
};

export default Reader;



