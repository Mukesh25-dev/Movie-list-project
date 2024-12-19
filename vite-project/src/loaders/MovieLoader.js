const MovieLoader = async (page = 1) => {
  const allMovies = [];
  const searchTerms = [
    "action",
    "comedy",
    "drama",
    "thriller",
    "horror",
    "romance",
    "adventure",
    "fantasy",
  ];
  const apiKey = "d3790b7a";
  try {
    const Response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerms[Math.floor(Math.random() * searchTerms.length)])}&page=${page}`
    );
    const data = await Response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      return [];
    }s
  } catch (error) {
    console.log("Error fetching data", error);
    return [];
  }
};

export default MovieLoader;
