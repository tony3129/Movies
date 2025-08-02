import React from 'react';

//template for movie cards
function MovieCard({ movie }){
    return (
        <div style={{ width: '150px', margin: '0.5rem' }}>
            <img
                //from https://developer.themoviedb.org/docs/image-basics
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
            />
            <p>{movie.title}</p>
        </div>
    )
}

export default MovieCard;