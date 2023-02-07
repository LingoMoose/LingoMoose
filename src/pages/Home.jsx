import PreviewSectionTemplate from "../components/PreviewSectionTemplate";
import Slider from "../components/Slider";

const Home = () => {

    return ( 
        
        <div>
            <Slider />
            <div className="max-6-xl mx-auto pt-4 space-y-6">
                <PreviewSectionTemplate
                 whereInfo={["offer", "==", true]}
                 caption={"Recent offers"}
                 link={"/offers"}
                 linkText={"offers"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "rent"]}
                 caption={"Places for rent"}
                 link={"category/rent"}
                 linkText={"rent listings"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "sell"]}
                 caption={"Places for sale"}
                 link={"category/sell"}
                 linkText={"sale listings"}
                />
            </div>
        </div>
     );
}
 
export default Home;