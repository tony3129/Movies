import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    //based on daisyUI card styling
    <div
      onClick={onClick}
      className="card card-xs bg-base-100 shadow-md cursor-pointer rounded-lg hover:shadow-1xl hover:scale-[1.02] transition-all duration-300 ease-in-out w-full flex flex-col"
    >
      <figure className="h-[300px] w-full overflow-hidden flex-shrink-0">
        {/*To account for empty movie posters*/}
        {movie.poster_path ? (
          <img
            //from https://developer.themoviedb.org/docs/image-basics
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </figure>
      <div className="card-body p-2 flex-grow">
        <h4 className="card-title text-sm truncate" title={movie.title}>
          {movie.title}
        </h4>
      </div>
    </div>
  );
}

export default MovieCard;
