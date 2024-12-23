const MovieLoader = async (page = 1, searchTerm = "") => {
  const apiKey = "d3790b7a"; // Replace with your actual API key
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        searchTerm
      )}&page=${page}`
    );
    const data = await response.json();

    // If the API response is successful, return the movies or empty array if no movies are found
    if (data.Response === "True") {
      return data.Search;
    } else {
      return []; // Return an empty array if no movies are found
    }
  } catch (error) {
    console.log("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
};

export default MovieLoader;
