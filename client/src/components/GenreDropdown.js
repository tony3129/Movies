import React from "react";

function GenreDropdown({ genres, onSelect }) {
    return (
        //setSelectedGenre from App.js is passed to onSelect
        <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
            <option disabled value="">Choose a genre</option>
            {/*create options for each genre type*/}
            {genres.map((genre)=>{
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            })}
        </select>
    )
}

export default GenreDropdown;