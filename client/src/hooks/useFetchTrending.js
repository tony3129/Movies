import { useState, useEffect } from "react";
//env variable for api access in deployment or development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

//fetch trending movies according to TMDB
function useFetchTrending(searchTerm){
    const [trending, setTrending] = useState([]);
    const [isTrendingLoading, setIsTrendingLoading] = useState(false);

    useEffect(() => {
        if(searchTerm){
            return;
        }
        //fetch api, and store results in trending, have loading spinner in the meantime
        setIsTrendingLoading(true);
        fetch(`${API_BASE_URL}/trending`)
        .then(res => res.json())
        .then(data => setTrending(data.results))
        .then(() => setIsTrendingLoading(false));
    }, [searchTerm])

    return { trending, isTrendingLoading }
}

export default useFetchTrending