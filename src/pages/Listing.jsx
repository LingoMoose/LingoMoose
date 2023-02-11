import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../Firebase";
import dateFormat from "dateformat";
import { FaHeadphones } from "react-icons/fa";
import { HiBookOpen } from "react-icons/hi"
import StoryImage from "../components/StoryImage";

const Listings = () => {
   
    const { storyId } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [publisher, setPublisher] = useState("");
    const [publishedDate, setPublishedDate] = useState("");


    useEffect(() => {
        async function fetchStory() {
          const docRef = doc(db, "vietnamese", storyId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setStory(docSnap.data());
            setLoading(false);
          }
        }
        fetchStory();

      }, [storyId]);

      useEffect(() => {
        if(story !== null){
          async function fetchUser() {
            const docRef = doc(db, "users", story.userRef);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setPublisher(docSnap.data());
            }
          }
            fetchUser();
            setPublishedDate(dateFormat(story.timestamp.toDate(), "fullDate"))
        }
      }, [story]);
      

      if (loading) {
        return <Spinner />;
      }

    return ( 
        <main>

            <div className="relative m-4 flex flex-col md:flex-row max-w-4xl lg:mx-auto p-4 rounded-lg shadow-lg  lg:space-x-5"
            style={{ backgroundColor: 'var(--background-color4)'}}
            >
                <div className="relative w-full flex flex-col justify-center items-center">
                    
                    <StoryImage 
                    title={story.title}
                    level={story.level}
                    image={story.imgUrls[0]}
                    />
                     
                    <div className="mt-6 mb-40  w-[95%] text-xl">
                        <span className="font-semibold block pb-2 pt-4">Summary</span>
                        <span className="pl-0 ml-0 leading-8">{story.storySummary.replace(/^\s+/, '')}</span>
                    </div>

                    <div className=" text-xl absolute bottom-6 left-6">
                        <p><span className="font-semibold pb-2 pt-4 inline-block">Author </span> {story.author}</p>
                        <p className="capitalize"><span className="font-semibold pb-2 pt-2 inline-block"> </span>{story.dialect} dialect</p>
                        <p><span className="font-semibold pb-2 pt-2 inline-block">Published by </span> {publisher.name}</p>
                       <p>{publishedDate}</p>
                    </div>
                    
                    <ul className="w-full flex justify-end items-end space-x-2 sm:space-x-10 text-sm font-semibold mb-6 mr-10">
                        <Link className="contents" to={`/listen/${storyId}`}>
                          <li className="flex flex-col items-center whitespace-nowrap cursor-pointer "><FaHeadphones className="text-5xl p-2 mb-3 text-neutral-500 bg-white border rounded-full shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg" />Listen</li>
                        </Link>
                        <Link className="contents" to={`/read/${storyId}`}>
                          <li className="flex pl-4 flex-col items-center whitespace-nowrap cursor-pointer "><HiBookOpen className="text-6xl p-2 mb-2 bg-sky-700 text-white rounded-full  shadow-md hover:shadow-lg active:shahow-lg focus:shadow-lg" />Study Now</li>
                        </Link>
                    </ul>
         
                </div>
            </div>

        </main>
     );
}
 
export default Listings;