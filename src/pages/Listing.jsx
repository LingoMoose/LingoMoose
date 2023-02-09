import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../Firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaHeadphones, FaShare } from "react-icons/fa";
import { HiBookOpen } from "react-icons/hi"

const Listings = () => {
   

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borderLevelColor, setBorderLevelColor] = useState("");
    const [textLevelColor, setTextLevelColor] = useState("");
    const [shadowLevelColor, setShadowLevelColor] = useState("");
    const [shareLinkCopy, setShareLinkCopy] = useState(false);


    SwiperCore.use([Autoplay, Navigation, Pagination]);

    useEffect(() => {
        async function fetchListing() {
          const docRef = doc(db, "vietnamese", listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setListing(docSnap.data());
            setLoading(false);
          }
        }
        fetchListing();

      }, [listingId]);

      useEffect(()=>{
        if(listing !== null){
            setBorderLevelColor(getBorderLevelColor(listing.level));
            setShadowLevelColor(getShadowLevelColor(listing.level));
            setTextLevelColor(getTextColorLevel(listing.level))
          }
      },[listing])

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

      


      

      if (loading) {
        return <Spinner />;
      }

    return ( 
        <main>
            <Swiper
                pagination={{
                type: "progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                autoplay={{ delay: 3000 }}
            >
                {listing.imgUrls.map((url, index) => (
                    
                <SwiperSlide key={index}>
                    <div
                    className="relative w-full overflow-hidden h-[300px]"
                    style={{
                        background: `url(${listing.imgUrls[index]}) center no-repeat`,
                        backgroundSize: "cover",
                    }}
                    ></div>
                </SwiperSlide>
                ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-50 bg-white cursor-pointer rounded-full border-[2px] border-gray-400 w-12 h-12 flex justify-center items-center">
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
                <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-50 py-1 px-2">Link copied</p>
            )}

            <div className="m-4 flex flex-col md:flex-row max-w-4xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className="relative w-full flex flex-col justify-center items-center">
                    <div className={`${borderLevelColor} border-b-[6px] relative w-full flex flex-col items-center justify-center`}>
                        <img 
                            src={listing.imgUrls[0]} 
                            alt="" 
                            className={`w-full max-h-[400px] cover shadow-md ${shadowLevelColor}`}
                        />
                        <div className={`absolute w-full flex flex-col justify-center bottom-0 pl-6  pb-1 z-50`}>
                            <p className="text-3xl font-normal text-white pb-1">
                                {listing.title}                    
                            </p>
                            <p className={`relative text-xl font-normal uppercase ${textLevelColor} z-50`}>
                                {listing.level}          
                            </p>
                            
                        </div>
                        <div className={`absolute bottom-0 pl-6 inset-x-0 h-20 bg-black opacity-75 z-10`}>
                            
                        </div>
                    </div>
                    
                
                    <div className="mt-4 mb-20 flex justify-start items-center space-x-4 w-[95%] text-xl">
                        <span className="font-semibold">Summary -</span>
                        <span>{listing.storySummary}</span>
                    </div>
                    
                    <ul className="w-full flex justify-end items-end space-x-2 sm:space-x-10 text-sm font-semibold mb-6 mr-10">
                        <li className="flex flex-col items-center whitespace-nowrap cursor-pointer "><FaHeadphones className="text-5xl p-2 mb-3 text-neutral-500 border rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg" />Listen</li>
                        
                        <Link className="contents" to={`/read/${listingId}`}>
                          <li className="flex pl-4 flex-col items-center whitespace-nowrap cursor-pointer "><HiBookOpen className="text-6xl p-2 mb-2 bg-sky-700 text-white rounded-full  shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg" />Study Now</li>
                        </Link>
                    </ul>
         
                </div>
            </div>

        </main>
     );
}
 
export default Listings;