import React from 'react';
import MovieCard from './MovieCard';

//component to fill out movie cards for search, trending, and genres
function MovieGrid({ movies, onMovieClick }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {/*create MovieCard for each movie*/}
        {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="w-[220px]"
            >
              <MovieCard
                movie={movie}
                onClick={() => onMovieClick(movie.id)}
              />
            </div>
          ))}
    </div>
  );
}

export default MovieGrid;
