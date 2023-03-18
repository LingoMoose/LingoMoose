
import PreviewSectionTemplate from "../components/PreviewSectionTemplate";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const Home = () => {
    const [newbie, setNewbie] = useState(false);
    const [elementary, setElementary] = useState(false);
    const [intermediate, setIntermediate] = useState(false);
    const [upperIntermediate, setUpperIntermediate] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [master, setMaster] = useState(false);
    const [hideStudied, setHideStudied] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [checked, setChecked] = useState([]);

    function onChange(e){
      setSearchValue(e.target.value);
    }

    const handleToggle = () => {
      setIsHidden(!isHidden);
    };

    useEffect(()=>{
        let array = []; 
        if(newbie) array.push("newbie");
        if(elementary) array.push("elementary");
        if(intermediate) array.push("intermediate");
        if(upperIntermediate) array.push("upperintermediate");
        if(advanced) array.push("advanced");
        if(master) array.push("master");
        if(array.length === 0){
          array = ["newbie","elementary","intermediate","upperintermediate", "advanced","master"];
        }
        setChecked(array);
    },[newbie, elementary, intermediate, upperIntermediate, advanced, master])

    return ( 
        
        <div>

            <Slider />
            
            <div className="max-w-7xl  mx-auto pt-4 space-y-6" >
            <div className="mt-16">
                <div className="relative">
                <div className={`grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto`}>
                    <label className="flex w-full border-0 items-center md:border-[2px]  pl-6 md:pl-2 pt-[2px] pb-[2px] col-start-1 xl:col-start-4 md:border-b-0  sm:rounded-tl-xl" 
                    style={{ backgroundColor: 'var(--background-color5)'}}
                    >
                        <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={hideStudied}
                        onChange={() => setHideStudied(!hideStudied)}
                        />
                        <span className="ml-2">Hide studied</span>
                    </label>
                    <label className="md:border-l-0 relative flex items-center border-l-0 border-t sm:border-[2px] sm:border-b-0 pr-2 pl-2 pt-[2px] pb-[2px] col-span-2 w-full border-b-0 sm:rounded-tr-xl"
                    style={{ backgroundColor: 'var(--background-color5)'}}
                    >
                        <input
                        type="text"
                        className="form-text w-full p-1 m-1 pr-3 ml-2 md:ml-10 pl-2 rounded-md"
                        value={searchValue}
                        onChange={onChange}
                        placeholder="Search for lesson..."
                        />
                        <FaSearch className="absolute right-5 cursor-pointer top-[15px] text-black"/>
                    </label>
                </div>
                <button
                    className="block w-full md:hidden bg-white border border-gray-300 p-2 focus:outline-none focus:bg-gray-200"
                    onClick={handleToggle}
                    style={{ backgroundColor: 'var(--background-color5)'}}
                > 
                    {isHidden ? (
                    <div >
                        <MdExpandMore className="inline-block text-xl mr-1"/>
                        <p className="inline-block">Show Filters</p>
                    </div>)  : (
                        <div>
                        <MdExpandLess className="inline-block text-xl mr-1" />
                        <p className="inline-block">Hide Filters</p>
                        </div>
                    )}
                </button>
                <div
                    className={`${
                    isHidden ? "hidden" : "block"
                    }  md:grid md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto `}
                    style={{ backgroundColor: 'var(--background-color5)'}}
                >
                    <label className="flex items-center border-t-none sm:border-[2px] pl-2 pt-[2px] pb-[2px] border-b-green-400 border-b-[3px] border-r-0">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={newbie}
                        onChange={() => setNewbie(!newbie)}
                    />
                    <span className="ml-2">Newbie</span>
                    </label>
                    <label className="flex items-center  border-t-none sm:border-[2px] sm:border-l-0 pl-2 pt-[2px] pb-[2px]  border-b-yellow-400 border-b-[3px] border-r-0">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={elementary}
                        onChange={() => setElementary(!elementary)}
                    />
                    <span className="ml-2">Elementary</span>
                    </label>
                    <label className="flex items-center  border-t-none sm:border-[2px]  sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-orange-400 border-b-[3px]  xl:border-r-0">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={intermediate}
                        onChange={() => setIntermediate(!intermediate)}
                    />
                    <span className="ml-2">Intermediate</span>
                    </label>
                    <label className="flex items-center  border-t-none sm:border-[2px]  pl-2 pt-[2px] pb-[2px] border-b-red-400 border-b-[3px] border-r-0">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={upperIntermediate}
                        onChange={() => setUpperIntermediate(!upperIntermediate)}
                    />
                    <span className="ml-2">Upper Intermediate</span>
                    </label>
                    <label className="flex items-center  border-t-none sm:border-[2px] sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-purple-600 border-b-[3px] border-r-0">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={advanced}
                        onChange={() => setAdvanced(!advanced)}
                    />
                    <span className="ml-2">Advanced</span>
                    </label>
                    <label className="flex items-center  border-t-none sm:border-[2px]  sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-black border-b-[3px] ">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={master}
                        onChange={() => setMaster(!master)}
                    />
                    <span className="ml-2 ">Master</span>
                    </label>
                </div>
            </div>
            </div>

                <PreviewSectionTemplate
                 whereInfo={["type", "==", "everydaylife"]}
                 caption={"Everyday Life"}
                 link={"category/everydaylife"}
                 linkText={"everyday life"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "business"]}
                 caption={"Business"}
                 link={"category/business"}
                 linkText={"business"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "funny"]}
                 caption={"Funny Stories"}
                 link={"category/funny"}
                 linkText={"funny stories"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "history"]}
                 caption={"History"}
                 link={"category/history"}
                 linkText={"history"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "culture"]}
                 caption={"Culture"}
                 link={"category/culture"}
                 linkText={"culture"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "currentevents"]}
                 caption={"Current Events"}
                 link={"category/currentevents"}
                 linkText={"current events"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "food"]}
                 caption={"Food"}
                 link={"category/food"}
                 linkText={"food"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "dialogue"]}
                 caption={"Dialogue"}
                 link={"category/dialogue"}
                 linkText={"dialogue"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
                <PreviewSectionTemplate
                 whereInfo={["type", "==", "language"]}
                 caption={"Language"}
                 link={"category/language"}
                 linkText={"language"}
                 levels={checked}
                 hideStudied={hideStudied}
                 searchValue={searchValue}
                />
            </div>
        </div>
     );
}
 
export default Home;