
import PreviewSectionTemplate from "../../components/stories/PreviewSectionTemplate";
import Slider from "../../components/ui/Slider";
import { useState } from "react";
import Filter from "../../components/stories/Filter";

const Stories = () => {
    const [levels, setLevels] = useState({
        newbie: false,
        elementary: false,
        intermediate: false,
        upperIntermediate: false,
        advanced: false,
        master: false,
      });
    const [hideStudied, setHideStudied] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [checked, setChecked] = useState([]);


    return (     
        <div>

            <Slider />
            
            <div className="max-w-7xl  mx-auto pt-4 space-y-6" >
            <div className="mt-16">
                <Filter 
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    levels={levels}
                    setLevels={setLevels}
                    hideStudied={hideStudied}
                    setHideStudied={setHideStudied}
                    setChecked={setChecked}
                />
            </div>

                <PreviewSectionTemplate
                 whereInfo={["type", "==", "everydaylife"]}
                 caption={"Everyday Life"}
                 link={"category/everydaylife"}
                 linkText={"everyday life"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "business"]}
                 caption={"Business"}
                 link={"category/business"}
                 linkText={"business"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "funny"]}
                 caption={"Funny Stories"}
                 link={"category/funny"}
                 linkText={"funny stories"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "history"]}
                 caption={"History"}
                 link={"category/history"}
                 linkText={"history"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "culture"]}
                 caption={"Culture"}
                 link={"category/culture"}
                 linkText={"culture"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "currentevents"]}
                 caption={"Current Events"}
                 link={"category/currentevents"}
                 linkText={"current events"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "food"]}
                 caption={"Food"}
                 link={"category/food"}
                 linkText={"food"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "dialogue"]}
                 caption={"Dialogue"}
                 link={"category/dialogue"}
                 linkText={"dialogue"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "language"]}
                 caption={"Language"}
                 link={"category/language"}
                 linkText={"language"}
                 levels={checked}
                 hideStudied={hideStudied}
                />
            </div>
        </div>
     );
}
 
export default Stories;