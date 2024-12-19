import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate("/movie", { state: { Search: searchTerm } }); // Pass search term to Movie page
    } else {
      alert("Please enter a search term");
    }
  };
  return (
    <div className="bg-black opacity-80 w-full h-screen">
      <div className="flex justify-center p-10">
        <input
          id="de"
          type="text"
          className="border border-red-400 p-2 w-96 focus:outline-none focus:ring-2 focus:ring-sky-400"
          placeholder="Enter Your Favourite Movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-red-400 text-white p-2 hover:transform hover:scale-105"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Search;
