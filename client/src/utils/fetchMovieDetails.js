async function fetchMovieDetails(movieId, setMovieDetails) {
   //for slow loading times - seperate from other loading methods, as loading message wouldn't appear unless modal pop up happened
  setMovieDetails({ loading: true });

  const res = await fetch(`/api/movie/${movieId}`);
  const data = await res.json();
  setMovieDetails(data);
}

export default fetchMovieDetails;
