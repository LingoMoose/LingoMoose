import { useState } from "react";
import { useParams } from "react-router";

import Filter from "../../components/stories/Filter";
import SearchResults from "../../components/stories/SearchResults";

const Search = () => {
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
    let param = useParams().searchValue;

    return ( 

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
            { param && (
                <div>
                <h2 className="w-full text-center text-4xl">All results for {param}</h2>  
                <h3 className="w-full text-center text-4xl mt-20">Still in development</h3>       
                <SearchResults 
                    levels={checked}
                    hideStudied={hideStudied}
                    param={param}
                />
               

                </div>


            )}
            


        </div>
     );
}
 
export default Search;