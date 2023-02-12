
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRedo, AiOutlineUndo } from 'react-icons/ai';
import { FaPlay, FaPause } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';


const AudioControls = ({ audioUrl }) => {

    const [audio] = useState(new Audio(audioUrl));
    const [isPlaying, setIsPlaying] = useState(false);
    const { t } = useTranslation();
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    
  
    useEffect(() => {
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

  
      return () => {
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        audio.removeEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
      };
    }, [audio]);
  
  
    const handleTimeUpdate = (e) => {
      audio.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
  
    const rewind = (time) => {
      audio.currentTime -= time;
    };

    const forward = (time) => {
        audio.currentTime += time;
      };
  
    const restart = () => {
      audio.currentTime = 0;
    };

    const nextLesson = () => {

      };

    const prevLesson = () => {

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
    <div className='min-h-[400px] flex flex-col justify-between'
      // style={{ backgroundColor: 'var(--background-color2)', color: 'var(--text-color)'}}
    >
     
     {/* audio control bar */}
        <div className="h-full flex items-center justify-between p-4 pt-6">
        <div className="text-sm font-medium pr-2 mb-1">
            {formatTime(currentTime)} 
        </div>
        <div className="flex-grow">
            <input
            type="range"
            className="w-full bg-gray-400 rounded-lg appearance-none"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleTimeUpdate}
            />
        </div>
        <button className="text-sm font-medium pl-2 mb-1">
            {formatTime(duration)}
        </button>
        </div>

        <div className='h-full mt-4 flex justify-center flex-col items-center'>
            <div>

                {/* refresh, speed next, prev controls */}
                <div className="flex justify-around mb-6 w-50">
                    <button
                    className="relative px-2 py-1 text-lg rounded-lg"
                    onClick={prevLesson}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full'>
                            <TbPlayerTrackPrev className="absolute  text-3xl" /> 
                        </div>
                        <p className='absolute text-[10px] top-8 left-[2px]'>Previous</p>
                    </button>

                    <button
                    className="relative px-2 py-1 text-lg rounded-lg"
                    onClick={restart}
                    >
                        <div className='h-8 w-8 relative flex justify-flexend items-center bg-red-500 p-2 rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg'>
                            <HiOutlineRefresh className="absolute text-white left-[6px] text-xl" />   
                        </div>
                        <p className='absolute text-[10px] top-8 left-[9px]'>Repeat</p>
                    </button>
                    <button onClick={() => changeRate(playbackRate)} 
                    className="flex relative justify-center items-center  px-2 py-1 text-sm rounded-lg">
                        <div className="h-8 w-8 flex items-center justify-center font-semibold">
                          {playbackRate === 1? "1.0" : playbackRate}x  
                        </div>
                        <p className='absolute text-[10px] top-[36px] left-[10px]'>Speed</p>
                    </button>
                    <button
                    className="relative px-2 py-1 text-lg rounded-lg"
                    onClick={nextLesson}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full'>
                            <TbPlayerTrackNext className="absolute  text-3xl" /> 
                        </div>
                        <p className='absolute text-[10px] top-8 left-[10px]'>Next</p>
                    </button>
                </div>



                {/* bottom controls rewind, play, forward */}
                <div className="flex justify-center">
                    <button
                    className="px-2 py-1 text-lg rounded-lg"
                    onClick={() => rewind(30)}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-90'>
                            <AiOutlineUndo className="absolute text-3xl font-light" />  
                            <p className='absolute rotate-[-90deg] text-[9px]'>30</p>
                        </div>
                        {t('')}
                    </button>
                    <button
                    className="px-2 py-1 text-lg rounded-lg"
                    onClick={() => rewind(5)}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-90'>
                            <AiOutlineUndo className="absolute text-3xl font-light" />  
                            <p className='absolute rotate-[-90deg] text-[9px]'>5</p>
                        </div>
                        {t('')}
                    </button>
                    <button
                    className="px-2 py-1 text-lg rounded-lg"
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
                    className="px-2 py-1 text-lg rounded-lg"
                    onClick={() => forward(5)}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-[-90deg]'>
                            <AiOutlineRedo className="absolute text-3xl font-light" />  
                            <p className='absolute rotate-90 text-[9px]'>5</p>
                        </div>
                        {t('')}
                    </button>
                    <button
                    className="px-2 py-1 text-lg rounded-lg"
                    onClick={() => forward(30)}
                    >
                        <div className='h-6 w-6 relative flex justify-center items-center rounded-full rotate-[-90deg]'>
                            <AiOutlineRedo className="absolute text-3xl font-light" />  
                            <p className='absolute rotate-90 text-[9px]'>30</p>
                        </div>
                        {t('')}
                    </button>
                </div>
            </div>
            
        </div>
    </div>
  );
};

export default AudioControls;