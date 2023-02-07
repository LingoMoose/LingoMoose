import CategoryPageTemplate from "../components/CategoryPageTemplate";

const Offers = () => {
    
    return ( 
        <div>
            <CategoryPageTemplate 
                title="Sale"
                whereInfo={["offer", "==", true]}
            />
        </div>
     );
}
 
export default Offers;