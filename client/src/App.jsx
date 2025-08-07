//set up dependenciees
import './App.css';
import React from 'react';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MoveDetailsModal';
import GenreSection from './components/GenreSection';
import MovieCarousel from './components/MovieCarousel';
import LoadingSpinner from './components/LoadingSpinner';
import fetchMovieDetails from './utils/fetchMovieDetails';

//set up custom hooks
import useFetchTrending from './hooks/useFetchTrending';
import useFetchGenres from './hooks/useFetchGenres';
import useFetchGenreMovies from './hooks/useFetchGenreMovies';
import useSearchMovies from './hooks/useSearchMovies';

function App() {
  //states to hold movie information
  const [searchTerm, setSearchTerm] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);

  const { trending, isTrendingLoading } = useFetchTrending(searchTerm);
  const { genres, selectedGenre, setSelectedGenre, isGenresLoading } = useFetchGenres();
  const { genreMovies, isGenreMoviesLoading } = useFetchGenreMovies(selectedGenre);
  const { searchResults, isSearchLoading } = useSearchMovies(searchTerm);

  const handleMovieClick = (id) => fetchMovieDetails(id, setMovieDetails);

  return (
    <div className="p-4 max-w-7xl mx-auto bg-base-100 min-h-screen">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      {/*remove trending and genre movies if searching*/}
      {searchResults.length > 0 ? (
        <>
          <h2 className="text-3xl font-semibold mb-6">Search Results</h2>
          {isSearchLoading ? (
            <LoadingSpinner
              message={"Loading Movie Results..."}
            />
          ) : (
            <MovieGrid
              movies={searchResults} 
              onMovieClick={handleMovieClick} 
            />
          )}
        </>
      ) : ( 
        <>
          <h1 className="text-3xl font-bold mb-6 ">Trending Movies</h1>
          {isTrendingLoading ? (
            <LoadingSpinner
              message={"Loading Trending Movies..."}
            />
          ) : (
            <MovieCarousel 
              movies={trending} 
              onMovieClick={handleMovieClick} 
            />
          )}

          <h2 className="text-2xl font-semibold mb-4">Select Genre</h2>
          {(isGenresLoading || isGenreMoviesLoading) ? (
            <LoadingSpinner
              message={"Loading Genre Movies..."}
            />
          ) : (
            <GenreSection
              genres={genres}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              genreMovies={genreMovies}
              onMovieClick={handleMovieClick}
            />
          )}
        </>
      )}
      {/*Show modal if movie is clicked*/}
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
