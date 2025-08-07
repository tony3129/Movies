import { useEffect, useState } from "react";

//to add delay before search function fetch happens
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() =>{
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        //cleanup timeout if value changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;