import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineUndo } from 'react-icons/ai';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
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
                className="inline text-base sm:text-lg sm:leading-10 leading-loose cursor-pointer hover:underline
                font-serif  text-gray-700 pt-4 pb-4"
                onClick={() => handleSentenceClick(sentence)}

                onMouseOver={() => handleWordHover(sentence)}
            >
                {sentence}
            </p>
        ))}
        </div>
        <div className='mt-4 flex justify-center flex-col items-center w-full'>
        <div className="relative flex justify-center w-full">
            <button onClick={() => changeRate(playbackRate)} 
            className="flex absolute ml-64 top-0 bottom-0 justify-center items-center  px-2 py-1 text-sm rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline">
                <div className="h-8 w-8 flex items-center justify-center font-semibold">
                  {playbackRate === 1? "1.0" : playbackRate}x  
                </div>
            </button>

            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={() => rewind(5)}
            >
                <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-90'>
                    <AiOutlineUndo className="absolute text-3xl font-light" />  
                    <p className='absolute rotate-[-90deg] text-[9px]'>5</p>
                </div>
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={togglePlay}
            >
                {isPlaying ? (
                    <>
                    <div className='h-12 w-12 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                        <FaPause className="absolute text-2xl text-white  left-[12px]" />
                    </div>
                    {t('')}
                    </>
                ) : (
                    <>
                    <div className='h-12 w-12 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                        <FaPlay className=" absolute text-2xl text-white  left-[14px]" />
                    </div>
                    
                    {t('')}
                    </>
                )}
            </button>
            <button
              className="relative px-2 py-1 text-lg rounded-lg hover:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={restart}
              >
                  <div className='h-8 w-8 relative flex justify-flexend items-center bg-red-500 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                      <HiOutlineRefresh className="absolute text-white left-[6px] text-xl" />   
                  </div>
              </button>
        </div>
        </div>
    </div>
  );
};

export default Reader;



