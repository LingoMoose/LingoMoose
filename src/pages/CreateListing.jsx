import { useState } from "react";

const CreateListing = () => {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountPrice: 0,


    })

    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountPrice} = formData;

    function onChange(){

    }

    const style = {
        label: `text-lg mt-6 font-semibold`
    };

    return ( 
        <main className="max-w-md px-2 mx-auto">
            <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
            <form>
                <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="flex">
                    <button type="button" id="type" value="sell" 
                        onClick={onChange} 
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === 'sale' ? "bg-slate-600 text-white" : "bg-white text-black" }`}
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
         
                <p className="text-lg mt-6 font-semibold">Parking spot</p>
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

                <p className="text-lg mt-6 font-semibold">Furnished</p>
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
                   
                <div className="flex items-center">
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
                        <p className={style.label}>Discounted Price</p>
                        <div className="flex w-full justify-center items-center space-x-6">  
                            <input type="number" id="discountedPrice" value={discountPrice} onChange={onChange} min="50" max="400000000" required={offer}
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
                    <p className="text-lg font-semibold">Images</p>
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