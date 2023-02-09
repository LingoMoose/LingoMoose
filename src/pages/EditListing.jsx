import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, serverTimestamp, updateDoc, } from "firebase/firestore";
import { db } from "../Firebase";
import 'firebase/storage';
import { useNavigate, useParams } from "react-router-dom";


const EditListing = () => {
    const auth = getAuth();
    const storage = getStorage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null)
    const [formData, setFormData] = useState({
        language: "vietnamese",
        title: "",
        author: "",
        storySummary: "",
        storyBody: "",
        storyBodyTranslation: "",
        level: "newbie",
        type: "everydaylife",
        isSeries: false,
        seriesTitle: "",
        part: 0,
        seriesSummary: "",
        images: {},
        audio: {},
        dialect: "northern",
        audioFileNames: [],
        imgFileNames: [],
        audioUrls: [],
        imgUrls: [],

    })

    const {language, type, title, author, images, audio, dialect, isSeries, part, seriesSummary, storySummary, seriesTitle, level, storyBody, storyBodyTranslation, audioFileNames, imgFileNames, audioUrls, imgUrls} = formData;

    const { listingId } = useParams();

    const existingAudioFileNames = audioFileNames;
    const existingImgFileNames = imgFileNames;

    console.log(formData);
    console.log(existingAudioFileNames)
    console.log(existingImgFileNames)
    console.log("existing")

    console.log(audio)
    console.log(images)


    useEffect(() => {
        if (listing && listing.userRef !== auth.currentUser.uid) {
          toast.error("You are not authorized to edit this listing");
          navigate("/");
        }
      }, [auth.currentUser, listing, navigate]);

    useEffect(()=>{
        setLoading(true);
        async function fetchListing() {
            const docRef = doc(db, "vietnamese", listingId);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setListing(docSnap.data());
              setFormData({ ...docSnap.data() });
              setLoading(false);
            } else {
              navigate("/");
              toast.error("Story not found");
              setLoading(false);
            }
          }
        fetchListing()
    },[listingId, navigate])


    function onChange(e){
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        // files / images
        if(e.target.files && (e.target.id === "images")){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        // files / audio
        if(e.target.files && (e.target.id === "audio")){
            setFormData((prevState) => ({
                ...prevState,
                audio: e.target.files
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

        console.log("images: "+images)
        if(images !== undefined){
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
        }
        
        
        async function storeImage(image) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
              imgFileNames.push(filename);
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
        
          if(images !== undefined && images.length !== 0){
            setFormData((prevState)=>({
                ...prevState,
                imgUrls: [],
                imgFileNames: []
            }))
            console.log("inside updating images")

            imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded");
            console.log("error message: " + error);
            return;
          });
        } 

          async function storeAudio(audio) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${audio.name}-${uuidv4()}`;
              audioFileNames.push(filename);
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, audio);
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

          if(audio !== undefined && audio.length !== 0){
            
            setFormData((prevState)=>({
                ...prevState,
                audioUrls: [],
                audioFileNames: []
            }))
            
            console.log("inside updating audio")
            audioUrls = await Promise.all(
                [...audio].map((audio) => storeAudio(audio))
            ).catch((error) => {
                setLoading(false);
                toast.error("Audio not uploaded");
                return;
            });


            
          } 
          


          const formDataCopy = {
            ...formData,
            imgUrls,
            audioUrls,
            imgFileNames,
            audioFileNames,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
          };

          console.log("formdataCopy");
          console.log(formDataCopy);

          delete formDataCopy.images;
          delete formDataCopy.audio;

          console.log(language)


        function deleteExistingFiles(existingImgFileNames){
            existingImgFileNames.forEach(fileName => {
                // code to delete the file with the given file name

                // Create a reference to the file to delete
                const desertRef = ref(storage, fileName);

                // Delete the file
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                    console.log(error)
                });

              });
        }

        if(images !== undefined){
            deleteExistingFiles(existingImgFileNames); 
        }
        if(audio !== undefined){
            deleteExistingFiles(existingAudioFileNames);  
        }

        
 const docRef = doc(db, language, listingId);

        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Story Edited");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
        
    }
    

    const style = {
        label: `text-lg mt-6 font-semibold`
    };

    if(loading){
        return <Spinner />
    }

    return ( 
        <main className="max-w-md md:max-w-3xl lg:max-w-6xl px-2 mx-auto">
            <h1 className="text-3xl text-center mt-6 font-bold">Edit Story</h1>
            <form onSubmit={onSubmit}>
                
                <p className={style.label}>Title</p>
                <input type="text" id="title" value={title} onChange={onChange} placeholder="Title of the story" maxLength="50" minLength="10" required 
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />

                <p className={`${style.label} mt-0`}>Author</p>
                <input type="text" id="author" value={author} onChange={onChange} placeholder="Orginal author of the story" maxLength="50" minLength="6" required 
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />

                <div>
                    <p className={`${style.label} mt-0`}>Summary</p>
                    <textarea type="text" id="storySummary" value={storySummary} onChange={onChange} placeholder="Summary of the story (in English!)" maxLength="1000" minLength="20" required 
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>

                <div>
                    <p className={`${style.label} mt-0`}>Story (Vietnamese)</p>
                    <p className="text-gray-600">Each sentence should end with either '<strong>.</strong>' , '<strong>!</strong>' or '<strong>?</strong>'</p>
                    <textarea type="text" id="storyBody" value={storyBody} onChange={onChange} placeholder="Write the story here (in Vietnamese)! Character limit of 4000. If longer, please make a series with multiple parts. (see send of form)" maxLength="4000" minLength="20" required 
                         style={{ minHeight: "300px" }} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>

                <div>
                    <p className={`${style.label} mt-0`}>Story (English translation)</p>
                    <p className="text-gray-600">Each sentence should end with either '<strong>.</strong>' , '<strong>!</strong>' or '<strong>?</strong>' and correspond with the above text. (for example, the 6th sentence here should match the 6th sentence above)  </p>
                    <textarea type="text" id="storyBodyTranslation" value={storyBodyTranslation} onChange={onChange} placeholder="Write the story here (in English)! This will serve as a translation (max 4000 characters)" maxLength="4000" minLength="20" required 
                         style={{ minHeight: "300px" }} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
         
                <p className={`${style.label} mt-0`}>Difficulty level</p>
                <div className="grid grid-cols-3">
                    <button type="button" id="level" value="newbie" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "newbie" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Newbie (A1)</button>
                    <button type="button" id="level" value="elementary" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "elementary" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Elementary (A2)</button>
                    <button type="button" id="level" value="intermediate" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "intermediate" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Intermediate (B1)</button>
                    <button type="button" id="level" value="upperintermediate" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "upperintermediate" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Upper Intermediate (B2)</button>
                    <button type="button" id="level" value="advanced" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "advanced" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Advanced (C1)</button>
                    <button type="button" id="level" value="master" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${level === "master" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Master (C2)</button>
                </div>


                <p className={`${style.label}`}>Category</p>
                <div className="grid grid-cols-3">
                    <button type="button" id="type" value="everydaylife" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "everydaylife" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Everyday Life</button>
                    <button type="button" id="type" value="business" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "business" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Business</button>
                    <button type="button" id="type" value="funny" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "funny" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Funny</button>
                    <button type="button" id="type" value="history" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "history" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >History</button>
                    <button type="button" id="type" value="culture" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "culture" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Culture</button>
                    <button type="button" id="type" value="currentevents" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "currentevents" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Current Events</button>
                    <button type="button" id="type" value="food" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "food" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Food</button>
                    <button type="button" id="type" value="dialogue" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "dialogue" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Dialogue</button>
                    <button type="button" id="type" value="language" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${type === "language" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Language</button>
                </div>
          

                <div className="">
                    <p className="text-lg mt-6 font-semibold">Is this a standalone story or part of a series?</p>
                    <div className="flex mb-6">
                        <button type="button" id="isSeries" value="false" 
                            onClick={onChange} 
                            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${isSeries === false ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                        >Standalone</button>
                        <button type="button" id="isSeries" value="true" 
                            onClick={onChange} 
                            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${isSeries === true ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                        >Series</button>
                    </div>
                    {isSeries === true && (
                    <div>
                        <div>
                            <p className={`${style.label} mt-0`}>Name of Series <span className="text-sm block">(spelling must match other parts exactly to be paired together)</span></p>
                            <input type="text" id="seriesTitle" value={seriesTitle} onChange={onChange} placeholder="Name of series" maxLength="60" minLength="10" required 
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                            />
                        </div>
                    
                        <div className="flex items-center mb-6">
                            
                            <div className="">
                                <p className={`${style.label} mt-0`}>Part</p>
                                <div className="flex w-full justify-center items-center space-x-6">  
                                    <input type="number" id="part" value={part} onChange={onChange} min="0" max="100" required={type === "series"}
                                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                                    />
                                
                                </div>
                            </div>  
                        </div>
                        {+part === 1 && ( 
                            <div>
                                <p className={`${style.label} mt-0`}>Summary of Series</p>
                                <textarea type="text" id="seriesSummary" value={seriesSummary} onChange={onChange} placeholder="Summary that encompasses the main points of the series (the summary only needs to be included with part 1)" maxLength="2000" minLength="20" required 
                                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                                />
                            </div>
                        )}  
                    </div>  
                    )}
                </div>

                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Images</p>
                    <p className="text-gray-600">(not required, will replace any existing images if selected) (max 6)</p>
                    <input type="file" id="images" onChange={onChange} accept =".jpg,.png,.jpeg" multiple 
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600" 
                    />
                </div>

                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Audio</p>
                    <p className="text-gray-600">(not required, will replace any existing audio if selected)</p>
                    <input type="file" id="audio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg" 
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600" 
                    />
                </div>

                <p className={`${style.label} mt-0`}>Audio Dialect</p>
                <div className="grid grid-cols-3 mb-6">
                    <button type="button" id="dialect" value="northern" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${dialect === "northern" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Northern</button>
                    <button type="button" id="dialect" value="central" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${dialect === "central" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Central</button>
                    <button type="button" id="dialect" value="southern" 
                        onClick={onChange} 
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${dialect === "southern" ? "bg-slate-600 text-white" : "bg-white text-black" }`}
                    >Southern</button>
                </div>


                <button type="submit" 
                    className="mb-6 px-7 py-3 w-full bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition ease-in-out duration-150">Edit Story</button>

            </form>
        </main>
     );
}
 
export default EditListing;