import PreviewSection from "../components/PreviewSection";
import Slider from "../components/Slider";

const Home = () => {

    return ( 
        
        <div>
            <Slider />
            <div className="max-6-xl mx-auto pt-4 space-y-6">
                <PreviewSection 
                 whereInfo={["offer", "==", true]}
                 caption={"Recent offers"}
                 link={"/offers"}
                 linkText={"offers"}
                />
                <PreviewSection 
                 whereInfo={["type", "==", "rent"]}
                 caption={"Place for rent"}
                 link={"/rent"}
                 linkText={"rent listings"}
                />
                <PreviewSection 
                 whereInfo={["type", "==", "sell"]}
                 caption={"Place for sale"}
                 link={"/sell"}
                 linkText={"sale listings"}
                />
            </div>
        </div>
     );
}
 
export default Home;