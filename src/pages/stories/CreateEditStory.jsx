import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/ui/Spinner";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const style = {
    label: `text-lg mt-6 font-semibold`
};

const CreateStory = () => {
    const { storyId } = useParams();
    const navigate = useNavigate();
    const auth = getAuth();
    const storage = getStorage();

    const [loading, setLoading] = useState(false);
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
        images: [],
        audio: [],
        dialect: "northern",
    });

    const fetchStory = async () => {
        setLoading(true);
        const docRef = doc(db, formData.language, storyId);
        const docSnap = await getDoc(docRef);
        setLoading(false);

        if (docSnap.exists()) {
            const storyData = docSnap.data();
            if (storyData.userRef !== auth.currentUser.uid) {
                toast.error("You are not authorized to edit this story");
                navigate("/");
            } else {
                setFormData({
                    language: storyData.language,
                    title: storyData.title,
                    author: storyData.author,
                    storySummary: storyData.storySummary,
                    storyBody: storyData.storyBody,
                    storyBodyTranslation: storyData.storyBodyTranslation,
                    level: storyData.level,
                    type: storyData.type,
                    isSeries: storyData.isSeries,
                    seriesTitle: storyData.seriesTitle,
                    part: storyData.part,
                    seriesSummary: storyData.seriesSummary,
                    dialect: storyData.dialect,
                    imgUrls: storyData.imgUrls,
                    audioUrls: storyData.audioUrls,
                });
            }
        } else {
            navigate("/");
            toast.error("Story not found");
        }
    };

    useEffect(() => {
        if (storyId && auth.currentUser) {
            fetchStory();
        };
    // eslint-disable-next-line
    }, [formData.language, storyId, navigate, auth.currentUser]);

    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files && (e.target.id === "images")) {
            // handle images
            // FileList doesn't support .some() method, so cast to Array
            if (Array.from(e.target.files).some((file) => file.size > 2000000)) {
                toast.error(
                    `${formData.images.length > 1 ? "Each image" : "Image"} must not exceed 2MB`
                )
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    images: e.target.files
                }))
            }
        } else if (e.target.files && (e.target.id === "audio")) {
            // handle audio
            setFormData((prevState) => ({
                ...prevState,
                audio: e.target.files
            }));
        } else {
            // text, booleans, numbers
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };

    const storeFile = async (file) => new Promise((resolve, reject) => {
        const languageStr = formData.language;
        const capitalizedLanguageStr = languageStr.charAt(0).toUpperCase() + languageStr.slice(1);
        let folderPath = `${capitalizedLanguageStr}/Stories/${formData.title}`;
        const filename = `${folderPath}/${auth.currentUser.uid}-${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

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

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const dbData = {
            ...formData,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };

        if (formData?.images?.length > 6) {
            setLoading(false);
            toast.error("Maximum 6 images are allowed");
            return;
        }

        if (formData?.audio?.length > 1) {
            setLoading(false);
            toast.error("Maximum 1 audio file allowed");
            return;
        }

        // delete existing images only if there are new images added
        if (formData?.imgUrls?.length > 0 && formData?.images?.length > 0) {
            deleteFiles(formData.imgUrls);
        }

        // delete existing audio only if there is new audio added
        if (formData?.audioUrls?.length > 0 && formData?.audio?.length > 0) {
            deleteFiles(formData.audioUrls);
        }

        if (formData?.images?.length > 0) {
            dbData.imgUrls = await Promise.all(
                [...formData.images].map((image) => storeFile(image))
            ).catch((error) => {
                setLoading(false);
                console.error(error);
                toast.error("Error uploading images");
                return;
            });
        }

        if (formData?.audio?.length > 0) {
            dbData.audioUrls = await Promise.all(
                [...formData.audio].map((audio) => storeFile(audio))
            ).catch((error) => {
                setLoading(false);
                console.error(error);
                toast.error("Error uploading audio");
                return;
            });
        }   

        delete dbData.images;
        delete dbData.audio;

        if (storyId) {
            // editing story
            const docRef = doc(db, formData.language, storyId);
            await updateDoc(docRef, dbData);
            navigate(`/category/${dbData.type}/${docRef.id}`);
        } else {
            // new story 
            const docRef = await addDoc(collection(db, formData.language), dbData);
            navigate(`/category/${dbData.type}/${docRef.id}`);
        }

        setLoading(false);
        toast.success("Story Saved");
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <main className="max-w-md md:max-w-3xl lg:max-w-6xl px-2 mx-auto">
            <h1 className="text-3xl text-center mt-6 font-bold">{storyId ? 'Edit Story' : 'Create a Story'}</h1>
            <form onSubmit={onSubmit}>
                <p className={style.label}>Title</p>
                <input type="text" value={formData.title} id="title" onChange={onChange} placeholder="Title of the story" maxLength="50" minLength="10" required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <p className={`${style.label} mt-0`}>Author</p>
                <input type="text" id="author" value={formData.author} onChange={onChange} placeholder="Orginal author of the story" maxLength="50" minLength="6" required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <div>
                    <p className={`${style.label} mt-0`}>Summary</p>
                    <textarea type="text" id="storySummary" value={formData.storySummary} onChange={onChange} placeholder="Summary of the story (in English!)" maxLength="1000" minLength="20" required
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <div>
                    <p className={`${style.label} mt-0`}>Story (Vietnamese)</p>
                    <p>Each sentence must end with either '<strong>.</strong>' , '<strong>!</strong>' or '<strong>?</strong>'</p>
                    <textarea type="text" id="storyBody" value={formData.storyBody} onChange={onChange} placeholder="Write the story here (in Vietnamese)! Character limit of 4000. If longer, please make a series with multiple parts. (see send of form)" maxLength="4000" minLength="20" required
                        style={{ minHeight: "300px" }} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <div>
                    <p className={`${style.label} mt-0`}>Story (English translation)</p>
                    <p>Each sentence must end with either '<strong>.</strong>' , '<strong>!</strong>' or '<strong>?</strong>' and correspond with the above text. (for example, the 6th sentence here should match the 6th sentence above)  </p>
                    <textarea type="text" id="storyBodyTranslation" value={formData.storyBodyTranslation} onChange={onChange} placeholder="Write the story here (in English)! This will serve as a translation (max 4000 characters). Please include proper punctuation to ensure accurate sentence alignment." maxLength="4000" minLength="20" required
                        style={{ minHeight: "300px" }} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <p className={`${style.label} mt-0`}>Difficulty level</p>
                <div className="grid grid-cols-3">
                    <button type="button" id="level" value="newbie"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "newbie" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Newbie (A1)</button>
                    <button type="button" id="level" value="elementary"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "elementary" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Elementary (A2)</button>
                    <button type="button" id="level" value="intermediate"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "intermediate" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Intermediate (B1)</button>
                    <button type="button" id="level" value="upperintermediate"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "upperintermediate" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Upper Intermediate (B2)</button>
                    <button type="button" id="level" value="advanced"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "advanced" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Advanced (C1)</button>
                    <button type="button" id="level" value="master"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.level === "master" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Master (C2)</button>
                </div>
                <p className={`${style.label}`}>Category</p>
                <div className="grid grid-cols-3">
                    <button type="button" id="type" value="everydaylife"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "everydaylife" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Everyday Life</button>
                    <button type="button" id="type" value="business"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "business" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Business</button>
                    <button type="button" id="type" value="funny"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "funny" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Funny</button>
                    <button type="button" id="type" value="history"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "history" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >History</button>
                    <button type="button" id="type" value="culture"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "culture" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Culture</button>
                    <button type="button" id="type" value="currentevents"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "currentevents" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Current Events</button>
                    <button type="button" id="type" value="food"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "food" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Food</button>
                    <button type="button" id="type" value="dialogue"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "dialogue" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Dialogue</button>
                    <button type="button" id="type" value="language"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.type === "language" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Language</button>
                </div>
                <div>
                    <p className="text-lg mt-6 font-semibold">Is this a standalone story or part of a series?</p>
                    <div className="flex mb-6">
                        <button type="button" id="isSeries" value="false"
                            onClick={onChange}
                            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${formData.isSeries ? "bg-white text-black" : "bg-slate-600 text-white"}`}
                        >Standalone</button>
                        <button type="button" id="isSeries" value="true"
                            onClick={onChange}
                            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${formData.isSeries ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                        >Series</button>
                    </div>
                    {formData.isSeries && (
                        <div>
                            <div>
                                {/* TODO: query series by this user and populate a selection */}
                                <p className={`${style.label} mt-0`}>Name of Series <span className="text-sm block">(spelling must match other parts exactly to be paired together)</span></p>
                                <input type="text" id="seriesTitle" value={formData.seriesTitle} onChange={onChange} placeholder="Name of series" maxLength="60" minLength="10" required
                                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                                />
                            </div>
                            <div className="flex items-center mb-6">
                                <div className="">
                                    <p className={`${style.label} mt-0`}>Part</p>
                                    <div className="flex w-full justify-center items-center space-x-6">
                                        <input type="number" id="part" value={formData.part} onChange={onChange} min="0" max="100" required={formData.type === "series"}
                                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                                        />
                                    </div>
                                </div>
                            </div>
                            {+formData.part === 1 && (
                                <div>
                                    <p className={`${style.label} mt-0`}>Summary of Series</p>
                                    <textarea type="text" id="seriesSummary" value={formData.seriesSummary} onChange={onChange} placeholder="Summary that encompasses the main points of the series (the summary only needs to be included with part 1)" maxLength="2000" minLength="20" required
                                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Images</p>
                    {storyId && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new uploads will replace existing images.</p>
                        </div>
                    )}
                    <p>The first image will be the cover (max 6)</p>
                    <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg" multiple
                        // required only if there aren't already images uploaded
                        required={!storyId}
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                    />
                </div>
                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Audio</p>
                    {storyId && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new uploads will replace existing audio.</p>
                        </div>
                    )}
                    <p>Audio file should match the body section exactly (Vietnamese only)</p>
                    <input type="file" id="audio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                        required={!storyId}
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                    />
                </div>
                <p className={`${style.label} mt-0`}>Audio Dialect</p>
                <div className="grid grid-cols-3 mb-6">
                    <button type="button" id="dialect" value="northern"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.dialect === "northern" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Northern</button>
                    <button type="button" id="dialect" value="central"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.dialect === "central" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Central</button>
                    <button type="button" id="dialect" value="southern"
                        onClick={onChange}
                        className={`border px-2 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                        ${formData.dialect === "southern" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Southern</button>
                </div>
                <button type="submit" className="mb-6 px-7 py-3 w-full bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition ease-in-out duration-150">
                    Save Story
                </button>
            </form>
        </main>
    );
}

export default CreateStory;
