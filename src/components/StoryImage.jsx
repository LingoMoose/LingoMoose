import { useState, useEffect } from "react";
import { FaArrowCircleRight, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

const StoryImage = ({level, title, image, storyId}) => {


    const [borderLevelColor, setBorderLevelColor] = useState("");
    const [textLevelColor, setTextLevelColor] = useState("");
    const [shadowLevelColor, setShadowLevelColor] = useState("");
    const [shareLinkCopy, setShareLinkCopy] = useState(false);

    useEffect(()=>{
        if(level !== null){
            setBorderLevelColor(getBorderLevelColor(level));
            setShadowLevelColor(getShadowLevelColor(level));
            setTextLevelColor(getTextColorLevel(level))
          }
      },[level])


      function getBorderLevelColor(level) {
        switch (level) {
          case "newbie":
            return 'border-green-400';
          case "elementary":
            return 'border-yellow-400';
          case "intermediate":
            return 'border-orange-400';
          case "upperintermediate":
            return 'border-red-400';
          case "advanced":
            return 'border-purple-600';
          case "master":
            return 'border-black';
          default:
            return 'border-gray-400';
        }
      }

      function getTextColorLevel(level) {
        switch (level) {
          case "newbie":
            return 'text-green-400';
          case "elementary":
            return 'text-yellow-400';
          case "intermediate":
            return 'text-orange-400';
          case "upperintermediate":
            return 'text-red-400';
          case "advanced":
            return 'text-purple-600';
          case "master":
            return 'text-black-900';
          default:
            return 'text-gray-400';
        }
      }

      function getShadowLevelColor(level) {
        switch (level) {
          case "newbie":
            return 'shadow-green-400';
          case "elementary":
            return 'shadow-yellow-400';
          case "intermediate":
            return 'shadow-orange-400';
          case "upperintermediate":
            return 'shadow-red-400';
          case "advanced":
            return 'shadow-purple-600';
          case "master":
            return 'shadow-black';
          default:
            return 'shadow-gray-400';
        }
      }



    return ( 
        <div className={`${borderLevelColor} border-b-[6px] relative w-full flex flex-col items-center justify-center`}>
    
            <img 
                src={image} 
                alt="" 
                className={`w-full max-h-[400px] cover shadow-md ${shadowLevelColor}`}
            />
            {!storyId && 
            <div className="absolute top-8 right-8 flex flex-col items-end" >
                <div className="  mb-2 bg-white cursor-pointer rounded-full border-[2px] border-gray-400 w-12 h-12 flex justify-center items-center">
                    <FaShare className="text-lg text-slate-500" 
                        onClick={()=>{
                            navigator.clipboard.writeText(window.location.href);
                            setShareLinkCopy(true);
                            setTimeout(()=>{
                                setShareLinkCopy(false)
                            }, 2000);
                        }}
                    />
                </div>
                {shareLinkCopy && (
                    <p className=" font-semibold border-2 border-gray-400 rounded-md bg-white py-1 px-2">Link copied</p>
                )}
            </div>}
            <div className={`absolute w-full flex flex-col justify-center bottom-0 pl-6  pb-1 z-50`}>
                <p className="text-3xl font-normal text-white pb-1">
                    {title}                    
                </p>
                <p className={`relative text-xl font-normal uppercase ${textLevelColor} z-50`}>
                    {level === "upperintermediate" ? "upper intermediate" : level}          
                </p>
                {storyId && 
                    <Link className="contents" to={`/read/${storyId}`}>
                        <div className="absolute right-6 flex flex-col justify-center items-center text-white cursor-pointer bottom-0 top-0">
                            <FaArrowCircleRight
                            className="text-lg"
                            />    
                            <p className="text-[10px]">Open</p>
                        </div>
                    </Link> 
                }
                

                
            </div>
            <div className={`absolute bottom-0 pl-6 inset-x-0 h-20 bg-black opacity-75 z-10`}>
                
            </div>
        </div>
     );
}
 
export default StoryImage;