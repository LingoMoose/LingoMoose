import PreviewSectionTemplate from "../components/PreviewSectionTemplate";
import Filter from "../components/Search";
import Slider from "../components/Slider";

const Home = () => {

    return ( 
        
        <div>
            <Slider />
            <Filter />
            <div className="max-6-xl mx-auto pt-4 space-y-6">
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "everydaylife"]}
                 caption={"Everyday Life"}
                 link={"category/everydaylife"}
                 linkText={"everyday life"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "business"]}
                 caption={"Business"}
                 link={"category/business"}
                 linkText={"business"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "funny"]}
                 caption={"Funny Stories"}
                 link={"category/funny"}
                 linkText={"funny stories"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "history"]}
                 caption={"History"}
                 link={"category/history"}
                 linkText={"history"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "culture"]}
                 caption={"Culture"}
                 link={"category/culture"}
                 linkText={"culture"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "currentevents"]}
                 caption={"Current Events"}
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
                 caption={"Dialogue"}
                 link={"category/dialogue"}
                 linkText={"dialogue"}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "language"]}
                 caption={"Language"}
                 link={"category/language"}
                 linkText={"language"}
                />
            </div>
        </div>
     );
}
 
export default Home;