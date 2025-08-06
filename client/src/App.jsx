//set up dependenciees
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import GenreDropdown from './components/GenreDropdown';
import useDebounce from './hooks/useDebounce';

function App() {
  //states to hold movie information
  const [trending, setTrending] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  //debounce search for 500ms (custom hook)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //calls to populate trending and genre data on first mount
  useEffect(() =>{
    fetch('/api/trending')
    .then((res) => res.json())
    .then((data) => setTrending(data.results));

    fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => 
      //fixed data member name: results => genres
      setGenres(data.genres));
  }, []);

  //populate genremovies based on selected genre
  useEffect(()=>{
    if(selectedGenre){
      fetch(`/api/genres/${selectedGenre}`)
      .then((res) => res.json())
      //added safety for if returned fetch is empty
      .then((data) => setGenreMovies(data?.results || []));
    }
  },[selectedGenre]);

  //once search term is set, calls handle search for api request
  useEffect(() => {
    if(debouncedSearchTerm){
      handleSearch(debouncedSearchTerm);
    } else {
      setSearchResults([]);

      //repopulate trending movies, when search is empty
      fetch('/api/trending')
      .then((res) => res.json())
      .then((data) => setTrending(data.results));
    }
  }, [debouncedSearchTerm]);

  //handler for searching movies
  const handleSearch = (term) => {
    const query = term.trim();
    //check if search is valid (not empty string, undefined, etc)
    if(!query) {
      setSearchResults([]);
      return;
    }

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      setSearchResults(data.results || []);
      setTrending([]);
      setGenreMovies([]);
      setSelectedGenre(null);
    });
  }

  //handler for movie details
  const handleMovieClick = (movieId) => {
    fetch(`/api/movie/${movieId}`)
    .then(res => res.json())
    .then(data => setMovieDetails(data))
  }


  return (
    <div className="p-4 max-w-7xl mx-auto bg-base-100 min-h-screen">
      
      {/*Search results*/}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Movies..."
          className="input border border-gray-400 rounded-lg"
          value={searchTerm}
          onChange={(e)=> {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      
      {searchResults.length > 0 ? (
        <>
          <h2 className="text-3xl font-semibold mb-6">Search Results</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            {searchResults.map((movie)=>{
              return <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => handleMovieClick(movie.id)}
              />
            })}
          </div>
        </>
      ) : ( 
        <>
          <h1 className="text-3xl font-bold mb-6 ">Trending Movies</h1>
          <div className="flex flex-wrap gap-4 mb-8">
            {/*create MovieCard for each movie*/}
            {trending.map((movie)=>{
              return <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => handleMovieClick(movie.id)}
              />
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Select Genre</h2>
          {/*Pass setSelectedGenre to GenreDropDown component*/}
          <div className="flex mb-8">
            <GenreDropdown genres={genres} onSelect={setSelectedGenre} />
          </div>

          {genreMovies.length > 0 && (
            <>
              {/*use + to convert string to number, and ? for match or for undefined*/}
              <h3 className="text-xl font-semibold mb-4">
                Most Popular Movies in {' '} 
                <span className="text-indigo-600">
                  {genres.find((g) => g.id === +selectedGenre)?.name}
                </span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {/*Create MovieCard for each matched movie*/}
                {genreMovies.map((movie)=>{
                  return <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={() => handleMovieClick(movie.id)}
                  />
                })}
              </div>
            </>
          )}
        </>
      )}
      {movieDetails && (
        <div
          className="modal modal-open"
          // click outside closes modal
          onClick={() => setMovieDetails(null)} 
        >
          <div
            className="modal-box bg-white text-black"
            //to stop close if clicked inside modal
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setMovieDetails(null)}
              className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4">{movieDetails.title}</h2>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
            <p><strong>Synopsis:</strong> {movieDetails.overview}</p>
            <p><strong>Released:</strong> {movieDetails.status === "Released" ? "Yes" : "No"}</p>
            <p><strong>Director:</strong> {
              movieDetails.credits.crew.find(person => person.job === 'Director')?.name || 'N/A'
            }</p>
            <p><strong>Cast:</strong> {
              movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')
            }</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
