import CategoryPageTemplate from "../components/CategoryPageTemplate";

const Sale = () => {
    
    return ( 
        <div>
            <CategoryPageTemplate 
                title="Offers"
                whereInfo={["offer", "==", true]}
            />
        </div>
     );
}
 
export default Sale;