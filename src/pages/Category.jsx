import { useParams } from "react-router";
import CategoryPageTemplate from "../components/CategoryPageTemplate";


const Category = () => {
    const params = useParams();
    let name = params.categoryName.toLowerCase();
    

    return ( 
        <div>
            <CategoryPageTemplate
                title={name}
                whereInfo={["type", "==", name]}
            />
        </div>
     );
}
 
export default Category;