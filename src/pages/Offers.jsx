import CategoryPageTemplate from "../components/CategoryPageTemplate";

const Offers = () => {
    
    return ( 
        <div>
            <CategoryPageTemplate
                title={"Series"}
                whereInfo={[ "isSeries", "==", true ]}
            />
        </div>
     );
}
 
export default Offers;