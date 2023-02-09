import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Filter = () => {
  const [newbie, setNewbie] = useState(false);
  const [elementary, setElementary] = useState(false);
  const [intermediate, setIntermediate] = useState(false);
  const [upperIntermediate, setUpperIntermediate] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [master, setMaster] = useState(false);
  const [hideStudied, setHideStudied] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [searchBar, setSearchBar] = useState('');

  function onChange(e){
    setSearchBar(e.target.value);
  }

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="mt-16">
    <div className="relative">
    <div className={`flex md:grid grid-rows-1 md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto`}>
        <label className="flex items-center border-[1px] pl-2 pt-[2px] pb-[2px] col-start-1 xl:col-start-4">
            <input
            type="checkbox"
            className="form-checkbox"
            checked={hideStudied}
            onChange={() => setHideStudied(!hideStudied)}
            />
            <span className="ml-2">Hide studied</span>
        </label>
        <label className=" relative flex items-center border-[1px] pr-2 pl-2 pt-[2px] pb-[2px] col-span-2 w-full">
            <input
            type="text"
            className="form-text w-full p-1 m-1 pr-3 ml-10 pl-2 rounded-md"
            value={searchBar}
            onChange={onChange}
            placeholder="Search for lesson..."
            />
            <FaSearch className="absolute right-5 cursor-pointer top-[15px]"/>
        </label>
    </div>
      <button
        className="block w-full md:hidden rounded-lg bg-white border border-gray-300 p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:bg-gray-200"
        onClick={handleToggle}
      >
        {isHidden ? "Show Filters" : "Hide Filters"}
      </button>
      <div
        className={`${
          isHidden ? "hidden" : "block"
        }  md:grid md:grid-cols-3 md:gap-0 xl:grid-cols-6 md:max-w-2xl xl:max-w-6xl mx-auto `}
      >
        <label className="flex items-center border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={newbie}
            onChange={() => setNewbie(!newbie)}
          />
          <span className="ml-2">Newbie</span>
        </label>
        <label className="flex items-center  border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={elementary}
            onChange={() => setElementary(!elementary)}
          />
          <span className="ml-2">Elementary</span>
        </label>
        <label className="flex items-center  border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={intermediate}
            onChange={() => setIntermediate(!intermediate)}
          />
          <span className="ml-2">Intermediate</span>
        </label>
        <label className="flex items-center  border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={upperIntermediate}
            onChange={() => setUpperIntermediate(!upperIntermediate)}
          />
          <span className="ml-2">Upper Intermediate</span>
        </label>
        <label className="flex items-center  border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={advanced}
            onChange={() => setAdvanced(!advanced)}
          />
          <span className="ml-2">Advanced</span>
        </label>
        <label className="flex items-center  border-[1px] pl-2 pt-[2px] pb-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={advanced}
            onChange={() => setMaster(!master)}
          />
          <span className="ml-2">Master</span>
        </label>
    </div>
  </div>
  
  </div>
  )
    }


export default Filter;



           

