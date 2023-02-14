import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineUndo } from 'react-icons/ai';
import { FaPlay, FaPause} from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { BiMenu } from 'react-icons/bi';
import DarkModeToggle from './DarkModeToggle';

const Reader = ({ text, audioUrl, translation }) => {

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontSize, setFontSize] = useState(24);
  const [displaySize, setDisplaySize] = useState()
  const [isHidden, setIsHidden] = useState(true);
  const [isShown, setIsShown] = useState("hidden");
  const [translationDisplay, setTranslationDisplay] = useState("min-h-[48px]");
  const [hoverEffect, setHoverEffect] = useState("hover:bg-[#d9d9d9]");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(()=>{
    if(isHidden){
      setIsShown("hidden")
    } else {
      setIsShown("visible")
    }
  },[isHidden])

  useEffect(() => {
    return () => {
        audio.pause()
        audio.currentTime = 0;
        console.log("in cleanup")
    }
  }, [audio])

  

  function lightModeToggle(){
    if(document.body.className === "light-mode"){
      setHoverEffect("hover:bg-[#4d4d4d]")
    } else {
      setHoverEffect("hover:bg-[#d9d9d9]")
    }
  }

  
  useEffect(()=>{
    setLoading(false);
  },[])

  useEffect(() => {
    if(fontSize < 18) {
      setDisplaySize("text-sm")
      setTranslationDisplay("min-h-[60px]")
    } else if (fontSize < 22) {
      setDisplaySize("text-base")
      setTranslationDisplay("min-h-[72px]")
    } else if (fontSize < 26) {
      setDisplaySize("text-lg")
      setTranslationDisplay("min-h-[84px]")
    } else if (fontSize < 30) {
      setDisplaySize("text-xl")
      setTranslationDisplay("min-h-[96px]")
    } else if (fontSize < 34) {
      setDisplaySize("text-2xl")
      setTranslationDisplay("min-h-[108px]")
    } else if (fontSize < 38) {
      setDisplaySize("text-3xl")
      setTranslationDisplay("min-h-[120px]")
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

  function toggleVisible(){
    setIsVisible(!isVisible);
  }

  return (
    <div className="relative mt-10 flex flex-col items-center justify-center max-w-4xl mx-auto shadow-md w-full h-full">
      <div className='realtive w-full '>
        
        {!loading  && (
        <div className={`relative top-0 left-0 w-full  ${translationDisplay}  pt-5 pb-5 p-2 z-20 shadow-sm flex items-center justify-center rounded-tl-lg rounded-tr-lg`}
        style={{ backgroundColor: 'var(--background-color4)'}}>
            <p className='absolute top-2 right-4 text-[10px] cursor-pointer z-10' onClick={toggleVisible}>{isVisible? "Hide" : "Show"}</p>
             
            <p className={`absolute top-2 left-4 text-[10px] ${isVisible? "" : "hidden"}`}>Sentence meaning</p>
            <div className={`flex justify-center cursor-pointer ${isVisible? "" : "hidden"}`} onClick={toggleTranslation}>
            <div className={`${fontFamily} ${displaySize} text-center justify-center cursor-pointer`}>{selectedTranslation ? selectedTranslation : "click sentence to translate"}</div>
            
            </div>

        </div>
        )}</div>

        <div className='p-4 px-6 shadow-sm z-10'
        style={{ backgroundColor: 'var(--background-color4)'}}
        >
        {text.split(/(?<=[.?!])/).map((sentence, index) => (
            <p 
                key={index}
                className={`inline  leading-loose cursor-pointer hover:rounded-lg ${hoverEffect}
                ${fontFamily} ${displaySize}   pt-3 pb-3`}
                onClick={() => handleSentenceClick(sentence)}

                onMouseOver={() => handleWordHover(sentence)}
            >
                {sentence}
            </p>
        ))}
        </div>
        <div className='relative flex justify-center flex-col items-center w-full rounded-bl-lg rounded-br-lg'
        style={{ backgroundColor: 'var(--background-color4)'}}>
        <div className="relative flex justify-center items-center w-full pt-4 pb-4 "
        >
            <button onClick={() => changeRate(playbackRate)} 
            className="flex absolute ml-64 z-50 top-0 bottom-0 justify-center items-center  px-2 py-1 text-sm rounded-lg">
                <div className="h-8 w-8 flex items-center justify-center font-semibold">
                  {playbackRate === 1? "1.0" : playbackRate}x  
                </div>
            </button>

            <button
            className="px-2 py-1 text-lg rounded-lg"
            onClick={() => rewind(5)}
            >
                <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-90'>
                    <AiOutlineUndo className="absolute text-3xl font-light rounded-full " />  
                    <p className='absolute rotate-[-90deg] text-[9px]'>5</p>
                </div>
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg"
            onClick={togglePlay}
            >
                {isPlaying ? (
                    <>
                    <div className='h-12 w-12 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg'>
                        <FaPause className="absolute text-2xl text-white  left-[12px]" />
                    </div>
                    {t('')}
                    </>
                ) : (
                    <>
                    <div className='h-12 w-12 relative flex justify-flexend items-center bg-sky-700 p-2 rounded-full shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg'>
                        <FaPlay className=" absolute text-2xl text-white  left-[14px]" />
                    </div>
                    
                    {t('')}
                    </>
                )}
            </button>
            <button
              className="relative px-2 py-1 text-lg rounded-lg"
              onClick={restart}
              >
                  <div className='h-8 w-8 relative flex justify-flexend items-center bg-red-500 p-2 rounded-full hover:shadow-lg active:shadow-lg focus:shadow-lg'>
                      <HiOutlineRefresh className="absolute text-white left-[6px] text-xl" />   
                  </div>
              </button>
        </div>
        <div className="z-30 absolute bottom-3 top-0 right-4 flex items-center justify-end w-80"
        >
          <button
            className="flex items-center mt-2 pr-2 text-gray-700 hover:text-gray-900"
            onClick={() => setIsHidden(!isHidden)}
          >
            <BiMenu 
              className='text-2xl'
            />
          </button>
        
            <div className={`absolute bottom-14 left-0 right-0 w-full max-w-sm rounded-lg shadow-xl py-2 ${isShown}`}
            style={{ backgroundColor: 'var(--background-color2)', color: 'var(--text-color)'}}>
              <div className="flex relative items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className='flex flex-row items-center justify-centerp-0'>
                  <h3 className="text-lg font-medium">Settings</h3>
                  <div className='max-h-[25px] pl-2 mt-[2px]' onClick={lightModeToggle}><DarkModeToggle /></div>
                  
                </div>
                
                <button
                  className=""
                  onClick={() => setIsHidden(true)}
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              <div className="px-4 py-3"
              style={{ backgroundColor: 'var(--background-color2)'}}>
                <label className="block font-medium">
                  Font Family
                </label>
                <select
                  className="w-full border border-gray-400 py-2 px-3 rounded-md mt-2"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  style={{ backgroundColor: 'var(--background-color2)', color: 'var(--text-color)'}}
                >
                  <option  value="font-sans">Sans</option>
                  <option value="font-serif">Serif</option>
                  <option value="font-mono">Mono</option>
                </select>
                <label className="block font-medium mt-3">
                  Font Size
                </label>
                <div className="w-full mt-2">
                  <input
                    type="range"
                    min="17"
                    max="34"
                    step="1"
                    className="w-full"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                  />
                  <div className="flex items-center mt-2">
                    <span >
                      {displaySize === "text-sm" ? "Small" :
                      displaySize === "text-base"? "Normal" :
                      displaySize === "text-lg"? "Large" :
                      displaySize === "text-xl"? "Extra Large" :
                      displaySize === "text-2xl"? "Double XL" :
                      displaySize === "text-3xl"? "Triple XL" :
                      displaySize
                    }</span>
                  </div>
                </div>
              </div>

            </div>
      
        </div>
        
        </div>        
    </div>
  );
};

export default Reader;



