import CategoryPageTemplate from "../components/CategoryPageTemplate";

const Offers = () => {
    
    return ( 
        <div>
            <CategoryPageTemplate 
                title="Offers"
                whereInfo={["offer", "==", true]}
            />
        </div>
     );
}
 
export default Offers;