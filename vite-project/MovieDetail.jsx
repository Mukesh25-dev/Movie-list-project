import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams(); // Get the imdbID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIKEY = "d3790b7a";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {movie && (
        <div className="flex justify-center p-10">
          <div>
            <h2>
              <strong>Title:</strong>
              {movie.Title}
            </h2>
            <p>
              <strong>Year:</strong>
              {movie.Year}
            </p>
            <p>
              <strong>Genre:</strong>
              {movie.Genre}
            </p>
            <p>
              <strong>Director:</strong>
              {movie.Director}
            </p>
            <p>
              <strong>Actors:</strong>
              {movie.Actors}
            </p>
            <p className="w-96">
              <strong>Plot:</strong>
              {movie.Plot}
            </p>
          </div>
          <div>
            <img src={movie.Poster} alt={movie.Title} className="w-44" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
