import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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


import { FaMapMarkerAlt, FaShare } from "react-icons/fa";

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

            <div className="m-4 p-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className="w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden">
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name} - $ {listing.offer ? 
                        listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                        listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" ? " / month" : ""}
                    </p>
                    <p className="flex items-center mt-6 mb-3 font-semibold">
                        <FaMapMarkerAlt className="mr-1 text-green-700" />{listing.address}
                    </p>
                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type === "rent" ? "Rent" : "Sale"}</p>
                        {listing.offer && (
                            <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                                ${((+listing.regularPrice) - (+listing.discountedPrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} discount
                            </p>
                        )}
                    </div>
                    <p className="mt-3 mb-3">Description - <span className="font-semibold">{listing.description}</span></p>
                </div>
                <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden">
                    
                </div>
            </div>



            <h1>listings</h1>
        </main>
     );
}
 
export default Listings;