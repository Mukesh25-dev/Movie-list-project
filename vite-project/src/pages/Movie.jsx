import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const Movie = () => {
  const location = useLocation();
  const { Search } = location.state || {};
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Search) {
      setLoading(true);
      const url = `https://www.omdbapi.com/?apikey=d3790b7a&t=${encodeURIComponent(
        Search
      )}`;
      console.log("API URL:", url);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response", data);
          if (data.Response === "True") {
            setMovies(data);
            setLoading(false);
          } else {
            setError(data.Error);
          }
          setLoading(false);
        })
        .catch((err) => console.log("error while fetching the data"));
    } else {
      setLoading(false);
    }
  }, [Search]);
  return (
    <div className="bg-gray-500 w-full h-screen text-white">
      <h1 className="text-3xl text-center">
        Movie Search Result for: <span className="text-black">{Search}</span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error:{error}</p>
      ) : movies ? (
        <div className="flex mt-10 items-center justify-center">
          <div>
            <p>
              <strong className="text-xl text-black mt-5">Title:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.Title}
            </p>
            <p>
              <strong className="text-xl text-black mt-5">Year:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.Year}
            </p>
            <p>
              <strong className="text-xl text-black mt-5">Genre:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.Genre}
            </p>
            <p className="w-96">
              <strong className="text-xl text-black mt-5">Actors:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.Actors}
            </p>
            <p className="w-96">
              <strong className="text-xl text-black mt-5">Plot:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.Plot}
            </p>
            <p>
              <strong className="text-xl text-black mt-5">IMDB Rating:</strong>
              &nbsp;&nbsp;&nbsp;
              {movies.imdbRating}
            </p>
          </div>
          <div className="space-x-4">
            <img src={movies.Poster} alt="" className="w-32" />
          </div>
        </div>
      ) : (
        <p>NO movie found for {Search}</p>
      )}

      <div className="flex justify-center mt-10">
        <Link to="/">
          <button className="bg-red-400 text-white p-2 hover:transform hover:scale-105">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Movie;
