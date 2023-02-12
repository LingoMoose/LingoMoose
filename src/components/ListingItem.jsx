import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaBookReader, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";

const ListingItem = ({listing, id, onEdit, onDelete}) => {

    const [borderLevelColor, setBorderLevelColor] = useState("");
    const [textLevelColor, setTextLevelColor] = useState("");

    useEffect(()=>{
        if(listing !== null){
            setBorderLevelColor(getBorderLevelColor(listing.level));
            setTextLevelColor(getTextColorLevel(listing.level))
          }
      },[listing])

      function getBorderLevelColor(level) {
        switch (level) {
          case "newbie":
            return 'border-green-400';
          case "elementary":
            return 'border-yellow-400';
          case "intermediate":
            return 'border-orange-400';
          case "upperintermediate":
            return 'border-red-400';
          case "advanced":
            return 'border-purple-600';
          case "master":
            return 'border-black';
          default:
            return 'border-gray-400';
        }
      }

      function getTextColorLevel(level) {
        switch (level) {
          case "newbie":
            return 'text-green-400';
          case "elementary":
            return 'text-yellow-400';
          case "intermediate":
            return 'text-orange-400';
          case "upperintermediate":
            return 'text-red-400';
          case "advanced":
            return 'text-purple-600';
          case "master":
            return 'text-black';
          default:
            return 'text-gray-400';
        }
      }

    return ( 
        
            <li className="relative flex flex-col justify-between items-center shadow-lg hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]"
            style={{ backgroundColor: 'var(--background-cards)'}}
            >
                <Link className="contents" to={`/category/${listing.type}/${id}`}>
                  <div>
                    <img className={`h-[170px] w-full object-cover hover:scale-110  transition-scale duration-200 ease-in`} loading="lazy" src={listing.imgUrls[0]} alt="listing" />
                  </div>
                    <Moment className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>{listing.timestamp?.toDate()}</Moment>
                    <div className={`w-full p-[10px]  border-b-[6px] ${borderLevelColor}`}>
                            <div className="flex items-center space-x-1">
                                <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p> 
                            </div>
                        <p className="font-semibold m-0 text-xl truncate text-[#457b9d] capitalize ">{listing.title}</p>
                        <p className=" mt-1 font-semibold text-sm capitalize ">
                            {listing.author}
                        </p>
                        <div className="flex items-center mt-[10px] space-x-3">
                            <div className="w-full flex justify-between items-center space-x-1 pr-1">
                                <p className={`font-bold text-xs ${textLevelColor} uppercase mb-[-10px]`}>
                                    {listing.level === "upperintermediate" ? "upper intermediate" : listing.level}
                                </p>
                                {!onDelete && (
                                  <FaBookReader className="h-4 w-4" />
                                )}   
                            </div>
                        </div>
                    </div>
                    
                    
                </Link>
                {onDelete && (
                    <FaTrash className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
                        onClick={() => onDelete(listing.id)}
                    />
                )}
                {onEdit && (
                    <MdEdit className="absolute bottom-2 right-7 h-4 cursor-pointer"
                        onClick={() => onEdit(listing.id)}
                    />
                )}
                
                
            </li>
        
     );
}
 
export default ListingItem;