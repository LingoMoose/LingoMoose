import { useParams } from "react-router";
import CategoryPageTemplate from "../../components/stories/CategoryPageTemplate";
import { useState } from "react";
import Filter from "../../components/stories/Filter";

const Category = () => {
    const params = useParams();
    let name = params.categoryName.toLowerCase();
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
            <CategoryPageTemplate
                title={name}
                whereInfo={["type", "==", name]}
                levels={checked}
                hideStudied={hideStudied}
                searchValue={searchValue}
            />
        </div>
     );
}
 
export default Category;