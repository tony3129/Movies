import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
//env variable for api access in deployment or development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

//fetch movies based on search input by user
function useSearchMovies(searchTerm) { 
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const debouncedSearch = useDebounce(searchTerm);

    useEffect(() => {
        if(!debouncedSearch){
            setSearchResults([]);
            return;
        }

        setIsSearchLoading(true);
        //fetch api, and store results in searchResults, have loading spinner in the meantime
        fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(debouncedSearch)}`)
        .then(res => res.json())
        .then((data) => setSearchResults(data.results || []))
        .then(() => setIsSearchLoading(false));
    }, [debouncedSearch])

    return { searchResults, isSearchLoading }
}

export default useSearchMovies;