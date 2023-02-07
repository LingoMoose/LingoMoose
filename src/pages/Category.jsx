import { useParams } from "react-router";
import CategoryPageTemplate from "../components/CategoryPageTemplate";


const Category = () => {
    const params = useParams();
    let name = params.categoryName.toLowerCase();
    if(name === "rent"){
        name = "Places for rent"
    } else if (name === "sell"){
        name = "Places for sale"
    }
    

    return ( 
        <div>
            <CategoryPageTemplate
                title={name}
                whereInfo={["type", "==", params.categoryName]}
            />
        </div>
     );
}
 
export default Category;