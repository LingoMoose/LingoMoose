import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide, SwiperSlides } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

const Listings = () => {

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopy, setShareLinkCopy] = useState(false);

    SwiperCore.use([Autoplay, Navigation, Pagination]);

    useEffect(() => {
        async function fetchListing() {
          const docRef = doc(db, "listings", listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setListing(docSnap.data());
            setLoading(false);
          }
        }
        fetchListing();
      }, [listingId]);
      if (loading) {
        return <Spinner />;
      }

    return ( 
        <main>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
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



            <h1>listings</h1>
        </main>
     );
}
 
export default Listings;