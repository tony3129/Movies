//env variable for api access in deployment or development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function fetchMovieDetails(movieId, setMovieDetails) {
   //for slow loading times - seperate from other loading methods, as loading message wouldn't appear unless modal pop up happened
  setMovieDetails({ loading: true });

  const res = await fetch(`${API_BASE_URL}/movie/${movieId}`);
  const data = await res.json();
  setMovieDetails(data);
}

export default fetchMovieDetails;
