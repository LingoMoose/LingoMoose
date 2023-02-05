import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { generateUsername } from 'username-generator';
import { db } from "../Firebase";
import { ShakeLittle } from "reshake";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FcHome } from 'react-icons/fc';
import { Link } from "react-router-dom";


const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData;

    function onLogout(){
        auth.signOut();
        navigate('/');
    }

    function onChange(e){
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    async function onSubmit(){
        try {

            const randomName = generateUsername("-");
       
            if(name === ""){
                setFormData(prevState => ({
                    ...prevState,
                    name: randomName
                }))
            }


            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, {
                name,
            })
            }
            toast.success("Profile username updated");

        } catch(error){
            toast.error("Could not update the profile username")
        }
    }

    function randomName() {
        const randomName = generateUsername("-");
        setFormData((prevState) => ({
          ...prevState,
          name: randomName,
        }));
      }

    const style = {
        email: `w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`,
        edit: `text-red-600 pr-3 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1`,
        signout: `text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer`
    }

    return ( 
        <div>
            <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
                <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
                <div className="w-full md:w-[50%] mt-6 px-3">
                    <form>
                        <div className="relative">
                            <div disabled={!changeDetail} className={`absolute right-3 top-3 text-xl cursor-pointer ${changeDetail ? "Block" : "hidden"}  `}>
                            <ShakeLittle >
                              <GiPerspectiveDiceSixFacesRandom  onClick={randomName}/>
                            </ShakeLittle>
                            </div> 
                        
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                                    changeDetail && "bg-red-200 focus:bg-red-200"
                                }`}
                            
                                disabled={!changeDetail}
                                onChange={onChange}
                                placeholder="Username"
                            />
                        </div>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            className={style.email}
                            disabled 
                        />
                        <div className="flex mb-6 justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="flex items-center ">Change username? 
                            <span onClick={() => {
                                changeDetail && onSubmit();
                                setChangeDetail((prevState) => !prevState);
                            }} className={style.edit}>{ changeDetail ? "Apply change" : "Edit" }</span></p>
                            <p onClick={onLogout} className={style.signout}>Sign out</p>
                        </div>
                    </form>
                    <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800">
                        <Link to="/create-listing" className="flex justify-center items-center">
                        <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
                        Sell or rent your home
                        </Link>                        
                    </button>
                </div>
            </section>
        </div>
     );
}
 
export default Profile;