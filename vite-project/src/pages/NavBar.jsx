import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieLoader from "../loaders/MovieLoader";

const NavBar = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Add a state to manage the current page

  const loadMovies = async (currentPage = page) => {
    setLoading(true);
    const data = await MovieLoader(currentPage); // Pass the current page to MovieLoader
    setMovies(data); // Update state with fetched movies
    setLoading(false); // Set loading to false
  };

  useEffect(() => {
    loadMovies(page); // Fetch movies when the component mounts or when the page changes
  }, [page]); // Re-run the effect whenever the page state changes

  const handlePageChange = (newPage) => {
    setPage(newPage); // Change the page state when the user clicks on a page number
  };

  return (
    <div>
      <nav className="flex p-6 bg-slate-400 justify-around">
        <h1 className="text-3xl text-center">Movie Search App</h1>
        <Link to="/search" className="p-2">
          <button className="border-none hover:bg-red-200">Search</button>
        </Link>
      </nav>

      {loading ? (
        <p>Loading...</p> // Show a loading message while fetching the data
      ) : movies.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="border p-4 shadow rounded">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"} // Placeholder for missing posters
                  alt={movie.Title}
                  className="w-full h-60 object-cover mb-2"
                />
                <p className="text-lg font-bold">{movie.Title}</p>
                <p className="text-sm text-gray-600">
                  <strong>Year:</strong> {movie.Year}
                </p>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-red-400 text-white px-4 py-2 mx-2"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="bg-red-400 text-white px-4 py-2 mx-2"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No movies found.</p> // If no movies are found, show this message
      )}
    </div>
  );
};

export default NavBar;
