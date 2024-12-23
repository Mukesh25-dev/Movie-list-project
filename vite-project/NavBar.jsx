import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieLoader from "../loaders/MovieLoader";

const NavBar = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // State to manage the current page
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search term

  const navigate = useNavigate();

  // Function to load movies based on page and search term
  const loadMovies = async (currentPage = page, search = "") => {
    setLoading(true);
    try {
      const data = await MovieLoader(currentPage, search); // Pass search term and current page to MovieLoader
      console.log("Fetched movies:", data); // Debugging: log the fetched data
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error); // Error handling
    } finally {
      setLoading(false);
    }
  };

  // Effect to load movies when the component mounts or when `page` or `searchTerm` changes
  useEffect(() => {
    loadMovies(page, searchTerm); // Fetch movies based on page and searchTerm
  }, [page, searchTerm]); // Dependencies: run effect when `page` or `searchTerm` changes

  // Handle the page change
  const handlePageChange = (newPage) => {
    setPage(newPage); // Change the page state when the user clicks on a page number
  };

  // Handle search button click
  const handleSearch = () => {
    setPage(1); // Reset to the first page when a new search is made
    loadMovies(1, searchTerm); // Load movies based on the search term and page 1
  };

  // Navigate to movie detail page on click
  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div>
      <nav className="flex p-6 bg-slate-400 justify-around">
        <h1 className="text-3xl text-center">Movie Search App</h1>
      </nav>

      <div>
        <div className="flex justify-center p-10">
          <input
            id="de"
            type="text"
            className="border border-red-400 p-2 w-96 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Enter Your Favourite Movie..."
            value={searchTerm} // Bind the input value to the state `searchTerm`
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
          />
          <button
            className="bg-red-400 text-white p-2 hover:transform hover:scale-105"
            onClick={handleSearch} // Trigger search when clicked
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p> // Show a loading message while fetching the data
      ) : movies.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="border p-4 shadow rounded cursor-pointer"
                onClick={() => handleMovieClick(movie.imdbID)} // Trigger navigation on movie click
              >
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
