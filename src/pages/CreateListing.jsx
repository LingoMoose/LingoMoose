import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { uuidv4 } from "@firebase/util";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
    const navigate = useNavigate();
    const [geolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        images: {},
    })

    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice, latitude, longitude, images} = formData;

    function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        // files
        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files

            }))
        }
        // text, booleans, numbers
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }
    async function onSubmit(e){
        const auth = getAuth();
        e.preventDefault();
        setLoading(true);
        if(+discountedPrice >= +regularPrice){
            setLoading(false);
            toast.error("Discounted must be less than regular price")
            return;
        }
        if(images.length > 6){
            setLoading(false);
            toast.error("Maximum 6 images are allowed")
            return;
        }

        for (let i = 0; i < images.length; i++) {
            if (images[i].size > 2000000) {
              toast.error(
                `${images.length > 1 ? "Each image" : "Image"} must not exceed 2MB`
              );
    
              return;
            }
          }
        
        let geolocation = {};
        let location;
        if(geolocationEnabled){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
            const data = await response.json();
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

            location = data.status === "ZERO_RESULTS" && undefined;

            if(location === undefined || (geolocation.lat === 0 && geolocation.lng === 0)){
                setLoading(false);
                toast.error("Please enter a valid address")
                return;
            }
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
        }

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                    default:
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                  });
                }
              );
            });
          }
      
          const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
          });
      
          const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
          };
          delete formDataCopy.images;
          !formDataCopy.offer && delete formDataCopy.discountedPrice;
          delete formDataCopy.latitude;
          delete formDataCopy.longitude;
          const docRef = await addDoc(collection(db, "listings"), formDataCopy);
          setLoading(false);
          toast.success("Listing created");
          navigate(`/category/${formDataCopy.type}/${docRef.id}`);
        
    }

    

    const style = {
        label: `text-lg mt-6 font-semibold`
    };

    if(loading){
        return <Spinner />
    }

    return ( 
        <main className="max-w-md px-2 mx-auto">
            <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
            <form onSubmit={onSubmit}>
                <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="flex">
                    <button type="button" id="type" value="sell" 
                        onClick={onChange} 
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === 'sell' ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Sell</button>
                    <button type="button" id="type" value="rent" 
                        onClick={onChange} 
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === 'rent' ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Rent</button>
                </div>
                <p className={style.label}>Name</p>
                <input type="text" id="name" value={name} onChange={onChange} placeholder="Name" maxLength="32" minLength="10" required 
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <div className="flex space-x-6 justify-start mb-6">
                    <div className="">
                        <p className="text-lg font-semibold">Beds</p>
                        <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="50" required
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                    </div>
                    <div className="">
                        <p className="text-lg font-semibold">Baths</p>
                        <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="50" required
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                    </div>
                </div>
         
                <p className={style.label}>Parking spot</p>
                <div className="flex">
                    <button type="button" id="parking" value="true" 
                        onClick={onChange} 
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${parking === true ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Yes</button>
                    <button type="button" id="parking" value="false" 
                        onClick={onChange} 
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${parking === false ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >No</button>
                </div>

                <p className={style.label}>Furnished</p>
                <div className="flex">
                    <button type="button" id="furnished" value="true" 
                        onClick={onChange} 
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${furnished === true ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Yes</button>
                    <button type="button" id="furnished" value="false" 
                        onClick={onChange} 
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${furnished === false ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >No</button>
                </div>
                <p className={style.label}>Address</p>
                <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address" maxLength="32" minLength="10" required 
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                {!geolocationEnabled && (
                    <div className="flex space-x-6 justify-start items-center">
                        <div>
                            <p className={`${style.label} mt-0`}>Latitude</p>
                            <input type="number" name="" id="latitude" value={latitude} onChange={onChange} required min="-90" max="90" 
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                            />
                        </div>
                        <div>
                            <p className={`${style.label} mt-0`}>Longitude</p>
                            <input type="number" name="" id="longitude" value={longitude} onChange={onChange} required min="-180" max="180" 
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                            />
                        </div>
                    </div>
                )}

                <p className={`${style.label} mt-0`}>Description</p>
                <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description" maxLength="32" minLength="10" required 
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />

                <p className={`${style.label} mt-0`}>Offer</p>
                <div className="flex">
                    <button type="button" id="offer" value="true" 
                        onClick={onChange} 
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${offer === true ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Yes</button>
                    <button type="button" id="offer" value="false" 
                        onClick={onChange} 
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${offer === false ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >No</button>
                </div>
                   
                <div className="flex items-center mb-6">
                    <div className="">
                        <p className={style.label}>Regular Price</p>
                        <div className="flex w-full justify-center items-center space-x-6">  
                            <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} min="50" max="400000000" required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                            />
                            {type === "rent" && (
                                <div className="">
                                <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>  
                </div>
                {offer === true && (
                <div className="flex items-center mb-6">
                    <div className="">
                        <p className={`${style.label} mt-0`}>Discounted Price</p>
                        <div className="flex w-full justify-center items-center space-x-6">  
                            <input type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} min="50" max="400000000" required={offer}
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                            />
                            {type === "rent" && (
                                <div className="">
                                <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                </div>
                            )}
                        </div>
                    </div>  
                </div>    
                )}

                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Images</p>
                    <p className="text-gray-600">The first image will be the cover (max 6)</p>
                    <input type="file" id="images" onChange={onChange} accept =".jpg,.png,.jpeg" multiple required 
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600" 
                    />
                </div>

                <button type="submit" 
                    className="mb-6 px-7 py-3 w-full bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition ease-in-out duration-150">Create Lisiting</button>

            </form>
        </main>
     );
}
 
export default CreateListing;