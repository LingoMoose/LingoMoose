import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { db } from "../Firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router";

const Slider = () => {

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    SwiperCore.use([Autoplay, Navigation, Pagination]);
    const navigate = useNavigate();

    useEffect(()=>{

        async function fetchListings(){
            const listingsRef = collection(db, "vietnamese");
            const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings);
            setLoading(false);
        };
        fetchListings();

        },[])
        
        if(loading){
            return <Spinner />;
        }
        if(listings.length === 0){
            return <div></div>;
        }
    
    

    return ( listings &&
        <div>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={{ EffectFade, Pagination, Navigation }}
                autoplay={{ delay:3000 }}
                className="mySwiper"

            >

            {listings.map(({data, id})=>(
                <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                    <div className="w-full h-[300px] overflow-hidden" 
                        style={{background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover"}}>
                    </div>
                    <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                        {data.name}
                    </p>
                    <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                        ${data.offer === true ? Number(data.discountedPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(data.regularPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {data.type === "rent" && " / month" }
                    </p>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
     );
}
 
export default Slider;