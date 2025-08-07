import { useState, useEffect } from "react";

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
        fetch('api/trending')
        .then(res => res.json())
        .then(data => setTrending(data.results))
        .then(() => setIsTrendingLoading(false));
    }, [searchTerm])

    return { trending, isTrendingLoading }
}

export default useFetchTrending