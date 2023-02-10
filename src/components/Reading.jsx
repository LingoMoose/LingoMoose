import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineUndo } from 'react-icons/ai';
import { FaPlay, FaPause} from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { BiMenu } from 'react-icons/bi';



const Reader = ({ text, audioUrl, translation }) => {

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontSize, setFontSize] = useState(14);
  const [displaySize, setDisplaySize] = useState()

  
  useEffect(()=>{
    setLoading(false);
  },[])

  useEffect(() => {
    if(fontSize < 18) {
      setDisplaySize("text-sm")
    } else if (fontSize < 22) {
      setDisplaySize("text-base")
    } else if (fontSize < 26) {
      setDisplaySize("text-lg")
    } else if (fontSize < 30) {
      setDisplaySize("text-xl")
    } else if (fontSize < 34) {
      setDisplaySize("text-2xl")
    } 
  },[fontSize])

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
        <div className="relative top-0 left-0 w-full pt-5 pb-5 p-2 text-white font-medium bg-gray-900 flex items-center justify-center">
            <div className="flex justify-center cursor-pointer" onClick={toggleTranslation}>
            <div className={`${fontFamily} ${displaySize} text-center justify-center cursor-pointer`}>{showTranslation ? selectedTranslation : 'Show Translation'}</div>
            </div>
        </div>
        )}
  
    
        <div className='p-4 bg-gray-200 rounded-lg'>
        {text.split(/(?<=[.?!])/).map((sentence, index) => (
            <p 
                key={index}
                className={`inline  leading-loose cursor-pointer hover:rounded-lg hover:bg-gray-300
                ${fontFamily} ${displaySize}   text-gray-700 pt-4 pb-4`}
                onClick={() => handleSentenceClick(sentence)}

                onMouseOver={() => handleWordHover(sentence)}
            >
                {sentence}
            </p>
        ))}
        </div>
        <div className='relative mt-4 flex justify-center flex-col items-center w-full'>
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
        

        <div className="absolute bottom-0 top-0 right-0 flex items-center justify-end w-80">
          <button
            className="flex items-center pr-6 text-gray-700 hover:text-gray-900"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <BiMenu 
              className='text-2xl'
            />
          </button>
          {settingsOpen && (
            <div className="absolute bottom-12 left-0 right-0 w-full max-w-sm bg-white rounded-lg shadow-xl py-4">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium">Settings</h3>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setSettingsOpen(false)}
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="px-4 py-3">
                <label className="block font-medium text-gray-700">
                  Font Family
                </label>
                <select
                  className="w-full border border-gray-400 py-2 px-3"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="font-sans">Sans</option>
                  <option value="font-serif">Serif</option>
                  <option value="font-mono">Mono</option>
                </select>
                <label className="block font-medium text-gray-700 mt-3">
                  Font Size
                </label>
                <div className="w-full mt-2">
                  <input
                    type="range"
                    min="17"
                    max="30"
                    step="1"
                    className="w-full"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                  />
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600">
                      {displaySize === "text-sm" ? "Small" :
                      displaySize === "text-base"? "Normal" :
                      displaySize === "text-lg"? "Large" :
                      displaySize === "text-xl"? "Extra Large" :
                      displaySize === "text-2xl"? "Double XL" :
                      displaySize
                    }</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
        </div>
        
    </div>
  );
};

export default Reader;



