import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';


const Reader = ({ text, audioUrl }) => {

  const [translatedText, setTranslatedText] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [audio, setAudio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=YOUR_API_KEY&text=${text}&lang=en`);
      const data = await response.json();
      setTranslatedText(data.text[0]);
    };
    fetchData();
  }, [text]);

  const handleSentenceClick = (sentence) => {
    // Make an API call to get the translation for the sentence
    // Replace the mock data with actual data from the API call
    const translation = 'This is a translation for the sentence.';

    setTranslatedText(translation);
  };

    const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleWordHover = (word) => {
    // Make an API call to get the translation for the word
    // Replace the mock data with actual data from the API call
    const translation = 'This is a translation for the word.';
  };

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));
  }, [audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audio.pause();
    } else {
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

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {!loading && (
        <div className="relative top-0 left-0 w-full h-12 p-2 text-white font-medium bg-gray-900">
            <div className="flex justify-center cursor-pointer hover:underline" onClick={toggleTranslation}>
            <div>{showTranslation ? translatedText : 'Show Translation'}</div>
            </div>
        </div>
        )}
  
        <div>
        {text.split(/(?<=[.?!])/).map((sentence, index) => (
            <p
                key={index}
                className="inline text-base leading-normal cursor-pointer hover:underline"
                onClick={() => handleSentenceClick(sentence)}
                onMouseOver={() => handleWordHover(sentence)}
            >
                {sentence}
            </p>
        ))}
        </div>
        <div className="flex justify-center">
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            onClick={rewind}
            >
            <FaRedo className="mr-2" />
            {t('Rewind 5 Secs')}
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            onClick={togglePlay}
            >
            {isPlaying ? (
                <>
                <FaPause className="mr-2" />
                {t('Pause')}
                </>
            ) : (
                <>
                <FaPlay className="mr-2" />
                {t('Play')}
                </>
            )}
            </button>
            <button
            className="px-2 py-1 text-lg rounded-lg hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            onClick={restart}
            >
            <FaRedo className="mr-2" />
            {t('Restart')}
            </button>
        </div>
    </div>
  );
};

export default Reader;



