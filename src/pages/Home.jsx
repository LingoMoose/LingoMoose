import PreviewSectionTemplate from "../components/PreviewSectionTemplate";
import Slider from "../components/Slider";

const Home = () => {

    return ( 
        
        <div>
            <Slider />
            <div className="max-6-xl mx-auto pt-4 space-y-6">
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "everydaylife"]}
                 caption={"Every day life"}
                 link={"category/everydaylife"}
                 linkText={"every day life"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "business"]}
                 caption={"Business"}
                 link={"category/business"}
                 linkText={"business"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "funny"]}
                 caption={"Funny"}
                 link={"category/funny"}
                 linkText={"funny"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "history"]}
                 caption={"History"}
                 link={"category/history"}
                 linkText={"history"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "culture"]}
                 caption={"culture"}
                 link={"category/culture"}
                 linkText={"culture"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "currentevents"]}
                 caption={"current events"}
                 link={"category/currentevents"}
                 linkText={"current events"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "food"]}
                 caption={"Food"}
                 link={"category/food"}
                 linkText={"food"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "dialogue"]}
                 caption={"dialogue"}
                 link={"category/dialogue"}
                 linkText={"dialogue"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "language"]}
                 caption={"language"}
                 link={"category/language"}
                 linkText={"language"}
                />
            </div>
        </div>
     );
}
 
export default Home;