import React, { useState } from "react";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router";

const Filter = ({hideStudied, setHideStudied, levels, setLevels, setChecked }) => {
    const [isHidden, setIsHidden] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const handleToggle = () => {
      setIsHidden(!isHidden);
    };

    function onChange(e){
        setSearchValue(e.target.value);
      }

    useEffect(()=>{
        let array = []; 
        if(levels.newbie) array.push("newbie");
        if(levels.elementary) array.push("elementary");
        if(levels.intermediate) array.push("intermediate");
        if(levels.upperIntermediate) array.push("upperintermediate");
        if(levels.advanced) array.push("advanced");
        if(levels.master) array.push("master");
        if(array.length === 0){
        array = ["newbie","elementary","intermediate","upperintermediate", "advanced","master"];
        }
        setChecked(array);
        // eslint-disable-next-line
    },[levels])
        const navigate = useNavigate();

    function search(e){
        e.preventDefault();
        if(searchValue !== ""){
            navigate(`/search/${searchValue.toLowerCase()}`)    
        }
    }

  return (
    <div className="mt-16">
 
      <div className="relative">
      <div className={`grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto`}>
          <label className="flex w-full border-0 items-center md:border-[2px]  pl-6 md:pl-2 pt-[2px] pb-[2px] col-start-1 xl:col-start-4 md:border-b-0  sm:rounded-tl-xl" 
          style={{ backgroundColor: 'var(--background-color5)'}}
          >
              <input
              type="checkbox"
              className="form-checkbox"
              checked={hideStudied}
              onChange={() => setHideStudied(!hideStudied)}
              />
              <span className="ml-2">Hide studied</span>
          </label>
          <form 
            className="md:border-l-0 relative flex items-center border-l-0 border-t sm:border-[2px] sm:border-b-0 pr-2 pl-2 pt-[2px] pb-[2px] col-span-2 w-full border-b-0 sm:rounded-tr-xl"
            style={{ backgroundColor: 'var(--background-color5)'}}
            onSubmit={search}
          >
              <input
                type="text"
                className="form-text w-full p-1 m-1 pr-3 ml-2 md:ml-10 pl-2 rounded-md"
                value={searchValue}
                onChange={onChange}
                placeholder="Search for lesson..."
              />
              <button type="submit">
                <FaSearch className="absolute right-5 cursor-pointer top-[15px] text-black"/>
              </button> 
         
              
          </form>
      </div>
      <button
          className="block w-full md:hidden bg-white border border-gray-300 p-2 focus:outline-none focus:bg-gray-200"
          onClick={handleToggle}
          style={{ backgroundColor: 'var(--background-color5)'}}
      > 
          {isHidden ? (
          <div >
              <MdExpandMore className="inline-block text-xl mr-1"/>
              <p className="inline-block">Show Filters</p>
          </div>)  : (
              <div>
              <MdExpandLess className="inline-block text-xl mr-1" />
              <p className="inline-block">Hide Filters</p>
              </div>
          )}
      </button>
      <div
          className={`${
          isHidden ? "hidden" : "block"
          }  md:grid md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto `}
          style={{ backgroundColor: 'var(--background-color5)'}}
      >
          <label className="flex items-center border-t-none sm:border-[2px] pl-2 pt-[2px] pb-[2px] border-b-green-400 border-b-[3px] border-r-0">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.newbie}
              onChange={(e) => setLevels({ ...levels, newbie: e.target.checked })}
          />
          <span className="ml-2">Newbie</span>
          </label>
          <label className="flex items-center  border-t-none sm:border-[2px] sm:border-l-0 pl-2 pt-[2px] pb-[2px]  border-b-yellow-400 border-b-[3px] border-r-0">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.elementary}
              onChange={(e) => setLevels({ ...levels, elementary: e.target.checked })}
          />
          <span className="ml-2">Elementary</span>
          </label>
          <label className="flex items-center  border-t-none sm:border-[2px]  sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-orange-400 border-b-[3px]  xl:border-r-0">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.intermediate}
              onChange={(e) => setLevels({ ...levels, intermediate: e.target.checked })}
          />
          <span className="ml-2">Intermediate</span>
          </label>
          <label className="flex items-center  border-t-none sm:border-[2px]  pl-2 pt-[2px] pb-[2px] border-b-red-400 border-b-[3px] border-r-0">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.upperIntermediate}
              onChange={(e) => setLevels({ ...levels, upperIntermediate: e.target.checked })}
          />
          <span className="ml-2">Upper Intermediate</span>
          </label>
          <label className="flex items-center  border-t-none sm:border-[2px] sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-purple-600 border-b-[3px] border-r-0">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.advanced}
              onChange={(e) => setLevels({ ...levels, advanced: e.target.checked })}
          />
          <span className="ml-2">Advanced</span>
          </label>
          <label className="flex items-center  border-t-none sm:border-[2px]  sm:border-l-0 pl-2 pt-[2px] pb-[2px] border-b-black border-b-[3px] ">
          <input
              type="checkbox"
              className="form-checkbox"
              checked={levels.master}
              onChange={(e) => setLevels({ ...levels, master: e.target.checked })}
          />
          <span className="ml-2 ">Master</span>
          </label>
      </div>
  </div>
  </div>
  )
    }


export default Filter;



           

