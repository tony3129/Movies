import React from "react";

function GenreDropdown({ genres = [], onSelect, selectedGenre }) {
    return (
        //setSelectedGenre from App.js is passed to onSelect
        <select 
            onChange={(e) => onSelect(e.target.value)} 
            value={genres.length === 0 ? "" : selectedGenre}
            className="select border border-gray-400 rounded-lg"
        >
            {/*create options for each genre type*/}
            {genres.map((genre)=>{
                return (
                    <option key={genre.id} value={genre.id}>
                    {' '}{genre.name}
                    </option>
                )
            })}
        </select>
    )
}

export default GenreDropdown;