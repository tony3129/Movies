import { useState, useEffect } from 'react'
//env variable for api access in deployment or development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

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
        fetch(`${API_BASE_URL}/genres/${selectedGenre}`)
        .then(res => res.json())
        //added safety for if returned fetch is empty
        .then(data => setGenreMovies(data?.results || []))
        .then(() => setIsGenreMoviesLoading(false));
    }, [selectedGenre]);

    return { genreMovies, isGenreMoviesLoading }
}

export default useFetchGenreMovies