import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="flex justify-end mb-4">
            <input
                type="text"
                placeholder="Search Movies..."
                className="input border border-gray-400 rounded-lg"
                value={searchTerm}
                onChange={(e)=> {
                    setSearchTerm(e.target.value);
                }}
            />
        </div>
    );
}

export default SearchBar;