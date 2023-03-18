import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Contact = ({userRef, listing}) => {
    const [landlord, setLandLord] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getLandLord(){
            const docRef = doc(db, "users", userRef);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setLandLord(docSnap.data());
            } else {
                toast.error("Could not get landlord data");
                
            }
        }
        getLandLord();
    }, [userRef])

    function onChange(e){
        setMessage(e.target.value);
    }

    return ( 
        <div>
            {landlord !== null && (

            <div className="flex flex-col w-full">
                <p className="">contact {landlord.name} for {listing.name.toLowerCase()}</p> 
                <div>
                    <textarea className="w-full mt-3 mb-4 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600" name="message" id="message" rows="2" value={message} onChange={onChange}></textarea>
                </div>
                <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                <button className="mb-6 px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center">Send Message</button></a>
            </div>

            )}
            
        
        </div>

        
     );
}
 
export default Contact;