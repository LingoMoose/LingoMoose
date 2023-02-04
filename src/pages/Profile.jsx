import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../Firebase";


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
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                                changeDetail && "bg-red-200 focus:bg-red-200"
                              }`}
                           
                            disabled={!changeDetail}
                            onChange={onChange}
                        />
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
                </div>
            </section>
        </div>
     );
}
 
export default Profile;