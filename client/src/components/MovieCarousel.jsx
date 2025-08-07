import React from 'react'
import { useRef } from 'react';
import MovieCard from './MovieCard';

function MovieCarousel({movies, onMovieClick}){
    const carouselRef = useRef(null);

    //to control spin of carousel
    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    };
    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }

    return (
        <div className='relative mb-8'>
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-ghost btn-sm bg-indigo-300 hover:bg-indigo-400 text-black border-none"
            >
                ❮
            </button>

            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-4 px-10 scrollbar-hide items-center min-h-[380px]"
            >
                {movies.map((movie)=>{
                    return <>
                        <div
                            key={movie.id}
                            //set width to prevent overlap
                            className='flex-shrink-0 w-[200px]'
                        >
                            <MovieCard
                                movie={movie} 
                                onClick={()=> onMovieClick(movie.id)}
                            />
                        </div>
                    </>
                })}
            </div>
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-ghost btn-sm bg-indigo-300 hover:bg-indigo-400 text-black border-none"
            >
                ❯
            </button>
        </div>
    )
}

export default MovieCarousel;