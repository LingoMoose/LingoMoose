import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";
import { db } from "../Firebase";

const PreviewSectionTemplate = ({whereInfo, caption, link, linkText}) => {
    let operand1 = whereInfo[0];
    let condition = whereInfo[1];
    let operand2 = whereInfo[2];

    
    const [listings, setListings] = useState(null);
    useEffect(()=>{
        async function fetchListings(){
            try {
                // get reference
                const listingsRef = collection(db, "vietnamese");
                // create the query
                const q = query(
                  listingsRef,
                  where(operand1, condition, operand2),
                  orderBy("timestamp", "desc"),
                  limit(4)
                  
                );
                // execute the query
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                  return listings.push({
                    id: doc.id,
                    data: doc.data(),
                  });
                });
                setListings(listings);
              } catch (error) {
                console.log(error);
              }
            }
            fetchListings();
          }, [operand1, condition, operand2]);
    
    
    return ( 
        <div>
            {listings && listings.length > 0 && (
                <div className="m-2 mb-6">
                    <h2 className="px-3 text-2xl mt-6 font-semibold">{caption}</h2>
                    <Link to={link} >
                        <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more {linkText}</p>
                    </Link>
                    <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {listings.map((listing)=>(
                            <ListingItem
                                key={listing.id}
                                listing={listing.data}
                                id={listing.id}
                            />
                        ))}
                    </ul>
                </div>   
            )}
        </div>
     );
}
 
export default PreviewSectionTemplate;