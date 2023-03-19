import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc, collection, orderBy, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { generateUsername } from 'username-generator';
import { db } from "../Firebase";
import { ShakeLittle } from "reshake";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GiBookmarklet } from 'react-icons/gi';
import { Link } from "react-router-dom";
import StoryItem from "../components/stories/StoryItem";


const Profile = () => {
    const auth = getAuth();
    const storage = getStorage();
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const [stories, setStories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData;
    
    function onLogout(){
        auth.signOut();
        navigate('/landing');
    }

    function onChange(e){
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function randomName() {
        const randBoolean = Math.random() < 0.5;
        let randomNumber = Math.floor(Math.random()*1000);
        randomNumber = randBoolean ? "-" + randomNumber : randomNumber;
        let randomName = randBoolean ? generateUsername("-") : generateUsername("");
        randomName += randomNumber;

        setFormData((prevState) => ({
          ...prevState,
          name: randomName,
        }));
      }

    async function onSubmit(){
        try {
       
            if(name === ""){
                randomName();
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

    const style = {
        email: `w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`,
        edit: `text-red-600 pr-3 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-1`,
        signout: `text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer`
    }

    useEffect(() => {
        async function fetchUserStories() {
          const storyRef = collection(db, "vietnamese");
          const q = query(
            storyRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          const querySnap = await getDocs(q);
          let stories = [];
          querySnap.forEach((doc) => {
            return stories.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setStories(stories);
          setLoading(false);
        }
        fetchUserStories();
      }, [auth.currentUser.uid]);


      const deleteFiles = (files) => {
        files.forEach(fileName => {
            // Create a reference to the file to delete
            const desertRef = ref(storage, fileName);

            // Delete the file
            deleteObject(desertRef).then(() => {
                // File deleted successfully
            }).catch((error) => {
                console.error('Error deleting files', error);
            });

        });
    };

      async function onDelete(story){
        const storyID = story.id
        const imgUrls = story.data.imgUrls
        const audioUrls = story.data.audioUrls
        if(window.confirm("Are you sure you want to DELETE?")){
            await deleteDoc(doc(db, "vietnamese", storyID))
            const updatedStories = stories.filter(
                (story) => story.id !== storyID
            );
            // delete from firebase database
            setStories(updatedStories);

            // delete from firebase storage
            deleteFiles(imgUrls)
            deleteFiles(audioUrls)
            
            toast.success("Successfully deleted the story")
        }
        console.log("delete")
        console.log(storyID)
        // console.log(images)
        // console.log(audio)

      }

      function onEdit(storyID){
        navigate(`/edit-story/${storyID}`)
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
                        <Link to="/create-story" className="flex justify-center items-center">
                        <GiBookmarklet className="mr-2 text-3xl bg-red-500 rounded-full p-1 border-2"/>
                        Upload a story
                        </Link>                        
                    </button>
                </div>
            </section>
            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!loading && stories.length > 0 && (
                    <div>
                         <h2 className="text-xl sm:text-2xl text-center font-semibold mb-6 mt-6">
                        My Stories
                        </h2>
                        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
                        {stories.map((story) => (
                            <StoryItem
                            key={story.id}
                            id={story.id}
                            story={story.data}
                            onDelete={() => onDelete(story)}
                            onEdit={() => onEdit(story.id)}
                            />
                        ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default Profile;