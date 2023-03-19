import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { db } from "../../Firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router";

const Slider = () => {

    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(true);

    SwiperCore.use([Autoplay, Navigation, Pagination]);
    const navigate = useNavigate();

    useEffect(()=>{

        async function fetchStories(){
            const storiesRef = collection(db, "vietnamese");
            const q = query(storiesRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);
            let stories = [];
            querySnap.forEach((doc)=>{
                return stories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setStories(stories);
            setLoading(false);
        };
        fetchStories();

        },[])

        
        if(loading){
            return <Spinner />;
        }
        if(stories.length === 0){
            return <div></div>;
        }
    
    

    return ( stories &&
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

            {stories.map(({data, id})=>(
                <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                    <div className="w-full h-[300px] overflow-hidden cursor-pointer" 
                        style={{background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover"}}>
                    </div>
                    <p className="capitalize text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 pr-4 rounded-br-3xl">
                        {data.title}
                    </p>
                    <p className={`uppercase text-white absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 pr-4 rounded-tr-3xl`}>
                        {data.level === "upperintermediate" ? "Upper Intermediate" : data.level}
                    </p>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
     );
}
 
export default Slider;