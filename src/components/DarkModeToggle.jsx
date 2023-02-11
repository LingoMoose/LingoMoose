import   {React, useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState("light-mode");

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };

    useEffect(()=>{
      if(isDarkMode){
        setTheme("dark-mode")
      }
      else if(!isDarkMode){
        setTheme("light-mode")
      }
    },[isDarkMode])

    useEffect(()=>{
      document.body.className = theme;
    }, [theme])


    return (
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={25}
       />
    );
  };
export default DarkModeToggle;
