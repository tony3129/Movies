import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={onClick}
      className="card card-xs bg-base-100 shadow-md cursor-pointer rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </figure>
      <div className="card-body">
        <h4 className="card-title text-sm">{movie.title}</h4>
      </div>
    </div>
  );
}

export default MovieCard;
