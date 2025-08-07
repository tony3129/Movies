import { useState, useEffect } from 'react'

//fetch genres based on genres defined by TMDB
function useFetchGenres() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isGenresLoading, setIsGenresLoading] = useState(false);

    useEffect(() => {
        setIsGenresLoading(true);

        //fetch api, and store results in genres, have loading spinner in the meantime
        fetch('/api/genres')
        .then(res => res.json())
        .then((data) => {
            const fetchGenres = data.genres || [];
            setGenres(fetchGenres);

            //to select first genre by default
            if(fetchGenres.length > 0) {
                setSelectedGenre(fetchGenres[0].id);
            }
        })
        .then(() => setIsGenresLoading(false));
    }, [])

    return { genres, selectedGenre, setSelectedGenre, isGenresLoading }
}

export default useFetchGenres;