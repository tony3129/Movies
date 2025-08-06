import React from 'react';
import GenreDropdown from './GenreDropdown';
import MovieGrid from './MovieGrid';

function GenreSection({ genres, selectedGenre, setSelectedGenre, genreMovies, onMovieClick }) {
  return (
    <>
        {/*Pass setSelectedGenre to GenreDropDown component*/}
        <div className="flex mb-8">
            <GenreDropdown 
              genres={genres} 
              onSelect={setSelectedGenre} 
            />
        </div>

        {genreMovies.length > 0 && (
            <>
            {/*use + to convert string to number, and ? for match or for undefined*/}
            <h3 className="text-xl font-semibold mb-4">
                Most Popular Movies in{' '}
                <span className="text-indigo-600">
                {genres.find((g) => g.id === +selectedGenre)?.name}
                </span>
            </h3>
            {/*Create MovieCard for each matched movie*/}
            <MovieGrid 
              movies={genreMovies} 
              onMovieClick={onMovieClick} 
            />
            </>
        )}
    </>
  );
}

export default GenreSection;
