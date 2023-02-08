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
import { getAuth } from "firebase/auth";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import Contact from "../components/Contact";

const Listings = () => {
    const auth = getAuth();

    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopy, setShareLinkCopy] = useState(false);
    const [contactLandLord, setContactLandLord] = useState(false);

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

            <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className=" w-full ">
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name} - ${listing.offer ? 
                        Number(listing.discountedPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                        Number(listing.regularPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                    <p className="mt-3 mb-3">
                        <span className="font-semibold">Description - </span>
                        {listing.description}
                    </p>
                    <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
                        <li className="flex items-center whitespace-nowrap"><FaBed className="mr-1" />{(+listing.bedrooms) > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed` }</li>
                        <li className="flex items-center whitespace-nowrap"><FaBath className="mr-1" />{(+listing.bathrooms) > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath` }</li>
                        <li className="flex items-center whitespace-nowrap"><FaParking className="mr-1" />{(listing.parking) === true ? `Parking Spot` : `No Parking` }</li>
                        <li className="flex items-center whitespace-nowrap"><FaChair className="mr-1" />{(listing.furnished) === true ? `Furnished` : `Not Furnished` }</li>
                        
                    </ul>
                    {listing.userRef !== auth.currentUser?.uid  && !contactLandLord && (
                        <div className="mt-6">
                        <button
                            onClick={() => setContactLandLord(true)}
                            className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
                        >
                            Contact Landlord
                        </button>
                        </div>
                    )}
                    {contactLandLord && (
                        <Contact
                            userRef={listing.userRef}
                            listing={listing}
                        />
                    )}
                </div>
                <div className="bg-pink-300 w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
           
                </div>
            </div>

        </main>
     );
}
 
export default Listings;