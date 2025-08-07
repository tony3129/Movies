import { useState, useEffect } from 'react'

//fetch most popular movies based on selected genre
function useFetchGenreMovies(selectedGenre) {
    const [genreMovies, setGenreMovies] = useState([]);
    const [isGenreMoviesLoading, setIsGenreMoviesLoading] = useState(false);

    useEffect(() => {
        if(!selectedGenre){
            return;
        }

        setIsGenreMoviesLoading(true);
        //fetch api, and store results in genreMovies, have loading spinner in the meantime
        fetch(`/api/genres/${selectedGenre}`)
        .then(res => res.json())
        //added safety for if returned fetch is empty
        .then(data => setGenreMovies(data?.results || []))
        .then(() => setIsGenreMoviesLoading(false));
    }, [selectedGenre]);

    return { genreMovies, isGenreMoviesLoading }
}

export default useFetchGenreMovies