//set up dependenciees
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MoveDetailsModal';
import GenreSection from './components/GenreSection';
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
      //clear trending, genremovies and selectedgenre to search results can take over the page
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
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      {searchResults.length > 0 ? (
        <>
          <h2 className="text-3xl font-semibold mb-6">Search Results</h2>
          <MovieGrid 
            movies={searchResults} 
            onMovieClick={handleMovieClick} 
          />
        </>
      ) : ( 
        <>
          <h1 className="text-3xl font-bold mb-6 ">Trending Movies</h1>
          <MovieGrid 
            movies={trending} 
            onMovieClick={handleMovieClick} 
          />

          <h2 className="text-2xl font-semibold mb-4">Select Genre</h2>
          <GenreSection
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            genreMovies={genreMovies}
            onMovieClick={handleMovieClick}
          />
        </>
      )}
      {movieDetails && (
        <MovieDetailsModal
          movieDetails={movieDetails}
          onClose={() => setMovieDetails(null)}
        />
      )}

    </div>
  );
}

export default App;
