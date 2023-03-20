import { useState } from "react";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { uuidv4 } from "@firebase/util";
import { doc, getDoc, serverTimestamp, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FaVolumeUp } from "react-icons/fa"
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const style = {
    label: `text-lg mt-6 font-semibold`
};

const AdminDictionary = () => {
    const [searchValue, setSearchValue] = useState("");
    
    const param = useParams().word;
    const auth = getAuth();
    const storage = getStorage();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        language: "vietnamese",
        english: "",
        vietnamese: "",
        english_lowercase: "",
        vietnamese_lowercase: "",
        definition: "",
        altTranslations: "",
        exampleSentence: "",
        partOfSpeech: "",
        level: "newbie",
        audio: {
          southern: {
            female: null,
            male: null
          },
          central: {
            female: null,
            male: null
          },
          northern: {
            female: null,
            male: null
          }
        },
        imgUrl: null,
        image: null,
      });

    console.log(formData)

    useEffect(()=>{
        setSearchValue(param)
        fetchWord(searchValue)
        // eslint-disable-next-line
    },[param])

    const playWord = (e, refWord) => {
        e.preventDefault()
        let audio = new Audio(refWord)
        audio.play()
      }

    function searchWord(e){
        e.preventDefault()
        navigate(`/admin/dictionary/${searchValue}`)
    }

    const fetchWord = async (word) => {
        
        const docRef = doc(db, formData.language + "Dictionary", word);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const wordData = docSnap.data();
            // user did not create the word, so they can not edit it, unless it's the admins account
            if ((wordData.userRef !== auth.currentUser.uid)&&("4xfyU4vrz2NYs9QVEjDfBDAxKTE2" !== auth.currentUser.uid)) {
                toast.error(`You are not authorized to edit "${word}"`);
            } else {
                setFormData({
                    language: wordData.language,
                    english: wordData.english,
                    vietnamese: wordData.vietnamese,
                    english_lowercase: wordData.english_lowercase,
                    vietnamese_lowercase: wordData.vietnamese_lowercase,
                    definition: wordData.definition,
                    altTranslations: wordData.altTranslations,
                    exampleSentence: wordData.exampleSentence,
                    partOfSpeech: wordData.partOfSpeech,
                    level: wordData.level,
                    imgUrl: wordData.imgUrl,
                    audioUrls: wordData.audioUrls,
                    audio: {
                        southern: {
                          female: null,
                          male: null
                        },
                        central: {
                          female: null,
                          male: null
                        },
                        northern: {
                          female: null,
                          male: null
                        }
                      },
                    image: null
                });
                toast.success(`found "${searchValue}"  in the dictionary`);
            }
        } else {
            setFormData({
                language: "vietnamese",
                english: word.charAt(0).toUpperCase() + word.slice(1),
                vietnamese: "",
                definition: "",
                english_lowercase: "",
                vietnamese_lowercase: "",
                altTranslations: "",
                exampleSentence: "",
                partOfSpeech: "",
                level: "newbie",
                audio: {
                southern: {
                    female: null,
                    male: null
                },
                central: {
                    female: null,
                    male: null
                },
                northern: {
                    female: null,
                    male: null
                }
                },
                audioUrls: {
                    southern: {
                    female: null,
                    male: null
                    },
                    central: {
                    female: null,
                    male: null
                    },
                    northern: {
                    female: null,
                    male: null
                    }
                },
                imgUrl: null,
                image: null
            })
            toast.success(`"${searchValue}" not yet defined`);
        }
    };

    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }

        if (e.target.files && (e.target.id === "image")) {
            // handle image
            const file = e.target.files[0];
            if (file.size > 2000000) {
              toast.error("Image must not exceed 2MB");
            } else {
              setFormData((prevState) => ({
                ...prevState,
                image: [file]
              }));
            }
          } else if (e.target.files) {
            // handle audio
            const file = e.target.files[0];
            const formDataCopy = { ...formData };
            if (e.target.id === "southernFemaleAudio") {
                formDataCopy.audio.southern.female = file;
            } else if (e.target.id === "southernMaleAudio") {
                formDataCopy.audio.southern.male = file;
            } else if (e.target.id === "centralFemaleAudio") {
                formDataCopy.audio.central.female = file;
            } else if (e.target.id === "centralMaleAudio") {
                formDataCopy.audio.central.male = file;
            } else if (e.target.id === "northernFemaleAudio") {
                formDataCopy.audio.northern.female = file;
            } else if (e.target.id === "northernMaleAudio") {
                formDataCopy.audio.northern.male = file;
            }
            setFormData(formDataCopy);
  
        } else {
            // text, booleans, numbers
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };

    const storeFile = async (file) => new Promise((resolve, reject) => {
        console.log("file")
        console.log(file)
        const languageStr = formData.language;
        const capitalizedLanguageStr = languageStr.charAt(0).toUpperCase() + languageStr.slice(1);
        const wordStr = formData.english;
        const capitalizedWordStr = wordStr.charAt(0).toUpperCase() + wordStr.slice(1);

        let folderPath = `${capitalizedLanguageStr}/Dictionary/${capitalizedWordStr}`;
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

    const deleteFile = (fileName) => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, fileName);
      
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            console.error('Error deleting file', error);
          });
      };

    async function onSubmit(e) {
        e.preventDefault();
        
        const dbData = {
            ...formData,
            vietnamese_lowercase: formData.vietnamese.toLowerCase(),
            english_lowercase: formData.english.toLowerCase(),
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };

        // delete existing image only if there is a new image added
        if (formData?.imgUrl && formData?.image) {
            deleteFile(formData.imgUrl);
        }

        // delete existing southern female audio only if there is new audio added
        if (formData?.audioUrls?.southern?.female && formData?.audioUrls?.southern?.female) {
            deleteFile(formData.audioUrls.southern.female);
        }

        // delete existing southern male audio only if there is new audio added
        if (formData?.audioUrls?.southern?.male && formData?.audioUrls?.southern?.male) {
            deleteFile(formData.audioUrls.southern.male);
        }
    
        // delete existing central female audio only if there is new audio added
        if (formData?.audioUrls?.central?.female && formData?.audioUrls?.central?.female) {
            deleteFile(formData.audioUrls.central.female);
        }

        // delete existing central male audio only if there is new audio added
        if (formData?.audioUrls?.central?.male && formData?.audioUrls?.central?.male) {
            deleteFile(formData.audioUrls.central.male);
        }

        // delete existing northern female audio only if there is new audio added
        if (formData?.audioUrls?.northern?.female && formData?.audioUrls?.northern?.female) {
            deleteFile(formData.audioUrls.northern.female);
        }

        // delete existing northern male audio only if there is new audio added
        if (formData?.audioUrls?.northern?.male && formData?.audioUrls?.northern?.male) {
            deleteFile(formData.audioUrls.northern.male);
        }

        // upload an image and create a reference
        if (formData?.image) {
            const imgUrl = await storeFile(formData.image[0]).catch((error) => {
              console.error(error);
              toast.error("Error uploading image");
              return;
            });
            if (imgUrl) {
              dbData.imgUrl = imgUrl;
            }
          }
        
        
        // upload southern female audio and create a reference
        if (formData?.audio?.southern?.female) {
            const audioUrl = await storeFile(formData.audio.southern.female).catch((error) => {
                console.error(error);
                toast.error("Error uploading southern female audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.southern.female = audioUrl;
                }
            }


        // upload southern male audio and create a reference
        if (formData?.audio?.southern?.male) {
            const audioUrl = await storeFile(formData.audio.southern.male).catch((error) => {
                console.error(error);
                toast.error("Error uploading southern male audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.southern.male = audioUrl;
                }
            }

        // upload central female audio and create a reference
        if (formData?.audio?.central?.female) {
            const audioUrl = await storeFile(formData.audio.central.female).catch((error) => {
                console.error(error);
                toast.error("Error uploading central female audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.central.female = audioUrl;
                }
            }

        // upload central male audio and create a reference
        if (formData?.audio?.central?.male) {
            const audioUrl = await storeFile(formData.audio.central.male).catch((error) => {
                console.error(error);
                toast.error("Error uploading central male audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.central.male = audioUrl;
                }
            }

        // upload northern female audio and create a reference
        if (formData?.audio?.northern?.female) {
            const audioUrl = await storeFile(formData.audio.northern.female).catch((error) => {
                console.error(error);
                toast.error("Error uploading northern female audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.northern.female = audioUrl;
                }
            }

        // upload northern male audio and create a reference
        if (formData?.audio?.northern?.male) {
            const audioUrl = await storeFile(formData.audio.northern.male).catch((error) => {
                console.error(error);
                toast.error("Error uploading northern male audio");
                return;
            });
                if (audioUrl) {
                    dbData.audioUrls.northern.male = audioUrl;
                }
            }

        delete dbData.image;
        delete dbData.audio;

        console.log(dbData)
        console.log("dbData")

        const docRef = doc(db, dbData.language + "Dictionary", dbData.english_lowercase);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const wordData = docSnap.data();
            // user did not create the word, so they can not edit it, unless it's the admins account
            if ((wordData.userRef !== auth.currentUser.uid)&&("4xfyU4vrz2NYs9QVEjDfBDAxKTE2" !== auth.currentUser.uid)) {
                toast.error(`You are not authorized to edit "${dbData.english_lowercase}"`);
            } else {
                // editing word
                const docRef = doc(db, formData.language + "Dictionary", formData.english_lowercase);
                await updateDoc(docRef, dbData);
                toast.success(`Successfully updated "${dbData.english_lowercase}"`);
            }
        } else {
            // new word 
            const docRef = doc(db, formData.language + "Dictionary", dbData.english_lowercase);
            await setDoc(docRef, dbData);
            toast.success(`Successfully added "${dbData.english_lowercase}" to the dictionary`);
        }

        setFormData({
            ...dbData,
            audio: {
                southern: {
                  female: null,
                  male: null
                },
                central: {
                  female: null,
                  male: null
                },
                northern: {
                  female: null,
                  male: null
                }
              },
        })


    }

    return (
        <main className="max-w-md md:max-w-3xl lg:max-w-6xl px-2 mx-auto">
            <form 
                className="flex flex-col items-center justify-center"
                onSubmit={searchWord}
            >
                <h2 className="text-2xl text-center mt-6 font-semibold">Search Word (in English)</h2>
                <input 
                    type="text" 
                    className="w-full max-w-sm px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value.toLowerCase())}
                />
            </form>
            <h1 className="text-3xl text-center mt-6 font-bold">{formData.english ? 'Edit Word' : 'Create a Word'}</h1>
            <form onSubmit={onSubmit}>
                <p className={style.label}>Word / phrase / expression / sentence (English)</p>
                <input type="text" value={formData.english} id="english" onChange={onChange} placeholder="English word" maxLength="50" minLength="1" required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <p className={`${style.label} mt-0`}>Word / phrase / expression / sentence (Vietnamese)</p>
                <input type="text" id="vietnamese" value={formData.vietnamese} onChange={onChange} placeholder="Vietnamese word" maxLength="50" minLength="1" required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                <div>
                    <p className={`${style.label} mt-0`}>Definition (optional)</p>
                    <textarea type="text" id="definition" value={formData.definition} onChange={onChange} placeholder="Definition in English" maxLength="200" 
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <div>
                    <p className={`${style.label} mt-0`}>Alternative Translations (only if word)</p>
                    <textarea type="text" id="altTranslations" value={formData.altTranslations} onChange={onChange} placeholder="cheerful, content, delighted, elated, exultant, glad, joyful, jubilant, merry, orgasmic" maxLength="100" 
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <div>
                    <p className={`${style.label} mt-0`}>Part of Speech (only if word)</p>
                    <textarea type="text" id="partOfSpeech" value={formData.partOfSpeech} onChange={onChange} placeholder="noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection, numeral, article, and determiner" maxLength="100" 
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                    />
                </div>
                <div>
                    <p className={`${style.label} mt-0`}>Example Sentence (optional)</p>
                    <textarea type="text" id="exampleSentence" value={formData.exampleSentence} onChange={onChange} placeholder="Example Sentence" maxLength="200" 
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-out duration-150 focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
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
                
                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Image</p>  
                    <div className="flex flex-col justify-center items-start">
                        <input type="file" id="image" onChange={onChange} accept=".jpg,.png,.jpeg" 
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.imgUrl && (
                            <div >
                                <img className="w-full h-80 mt-2" src={formData.imgUrl} alt={formData.english} />
                            </div>
                        )}  
                    </div>
                    {formData.image && formData.imgUrl && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new uploads will replace the existing image.</p>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <p className={`${style.label} mt-0`}>Audio (Vietnamese only)</p>
                    

                    <p className="mt-4 font-semibold">Southern Female</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="southernFemaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.southern?.female && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.southern.female)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}  
                    </div>
                    {formData?.audio?.southern?.female && formData?.audioUrls?.southern?.female && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new southern female audio uploads will replace the existing audio.</p>
                        </div>
                    )}

                    <p className="mt-4 font-semibold">Southern Male</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="southernMaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.southern?.male && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.southern.male)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}    
                    </div>
                    
                    {formData?.audio?.southern?.male && formData?.audioUrls?.southern?.male && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new southern male audio uploads will replace the existing audio.</p>
                        </div>
                    )}

   
                    <p className="mt-4 font-semibold">Central Female</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="centralFemaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.central?.female && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.central.female)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}  
                    </div>
                    {formData?.audio?.central?.female && formData?.audioUrls?.central?.female && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new central female audio uploads will replace the existing audio.</p>
                        </div>
                    )}

                    
                    <p className="mt-4 font-semibold">Central Male</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="centralMaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.central?.male && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.central.male)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}  
                    </div>
                    {formData?.audio?.central?.male && formData?.audioUrls?.central?.male && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new central male audio uploads will replace the existing audio.</p>
                        </div>
                    )}

                         
                    <p className="mt-4 font-semibold">Northern Female</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="northernFemaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.northern?.female && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.northern.female)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}  
                    </div>
                    {formData?.audio?.northern?.female && formData?.audioUrls?.northern?.female && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new northern female audio uploads will replace the existing audio.</p>
                        </div>
                    )}
                    
                    
                    <p className="mt-4 font-semibold">Northern Male</p>
                    <div className="flex justify-center items-center">
                        <input type="file" id="northernMaleAudio" onChange={onChange} accept=".mp3, .wav, .aac, .ogg"
                            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-out focus:bg-white focus:border-slate-600"
                        />
                        {formData?.audioUrls?.northern?.male && (
                            <div >
                                <button onClick={(e)=>playWord(e, formData.audioUrls.northern.male)}><FaVolumeUp className="text-3xl ml-3" /></button>
                            </div>
                        )}  
                    </div>
                    {formData?.audio?.northern?.male && formData?.audioUrls?.northern?.male && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <p>Any new northern male audio uploads will replace the existing audio.</p>
                        </div>
                    )}
                </div>
                
                <button type="submit" className="mb-6 px-7 py-3 w-full bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition ease-in-out duration-150">
                    Save word
                </button>
            </form>
        </main>
    );
}

export default AdminDictionary;