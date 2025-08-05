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
  const [selectedMovieId, setSelectedMovieId] = useState(null);
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
    setSelectedMovieId(movieId);
    fetch(`/api/movie/${movieId}`)
    .then(res => res.json())
    .then(data => setMovieDetails(data))
  }


  return (
    <div style={{ padding: '1rem '}}>
      {/*Search results*/}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e)=> {
            setSearchTerm(e.target.value);
          }}
          style={{ padding: '0.5rem', width: '250px', marginRight: '0.5rem' }}
        />
      </div>
      
      {searchResults.length > 0 ? (
        <>
          <h2>Search Results</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            {searchResults.map((movie)=>{
              return <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)}/>
            })}
          </div>
        </>
      ) : ( 
        <>
          <h1>Trending Movies</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {/*create MovieCard for each movie*/}
            {trending.map((movie)=>{
              return <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)}/>
            })}
          </div>

          <h2>Select Genre</h2>
          {/*Pass setSelectedGenre to GenreDropDown component*/}
          <GenreDropdown genres={genres} onSelect={setSelectedGenre}/>

          {genreMovies.length > 0 && (
            <>
              {/*use + to convert string to number, and ? for match or for undefined*/}
              <h3>Most Popular Movies in {' '} {genres.find((g)=> g.id === +selectedGenre)?.name}</h3>
              <div style={{ display:'flex', flexWrap: 'wrap' }}>
                {/*Create MovieCard for each matched movie*/}
                {genreMovies.map((movie)=>{
                  return <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)}/>
                })}
              </div>
            </>
          )}
        </>
      )}
      {movieDetails && (
        //temp style for modal 
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '10%',
          width: '80%',
          backgroundColor: 'white',
          padding: '1rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 999
        }}>
          {/**Button to close modal */}
          <button onClick={()=>{ setMovieDetails(null); setSelectedMovieId(null)}} style={{ float: 'right' }}>
            X
          </button>

          <h2>{movieDetails.title}</h2>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p><strong>Runtime:</strong> {movieDetails.minutes}</p>
          <p><strong>Synopsis:</strong> {movieDetails.overview}</p>
          <p><strong>Released:</strong> {movieDetails.status === "Released" ? "Yes" : "No"}</p>
          <p><strong>Director:</strong> {
            movieDetails.credits.crew.find(person => person.job === 'Director')?.name || 'N/A'
          }</p>
          {/**Show the first 5 cast members */}
          <p><strong>Cast:</strong> {
            movieDetails.credits.cast.slice(0,5).map(actor => actor.name).join(', ')
          }</p>         
        </div>
      )}
    </div>
  );
}

export default App;
