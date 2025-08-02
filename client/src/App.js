//set up dependenciees
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

function App() {
  //states to hold movie information
  const [trending, setTrending] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);

  //calls to populate trending and genre data on first mount
  useEffect(() =>{
    fetch('/api/trending')
    .then((res) => res.json())
    .then((data) => setTrending(data.results));

    fetch('/api/genres')
    .then((res) => res.json())
    .then((data) => setGenres(data.results));
  }, []);

  //populate genremovies based on selected genre
  useEffect(()=>{
    if(selectedGenre){
      fetch(`/api/genres/${selectedGenre}`)
      .then((res) => res.json())
      .then((data) => setGenreMovies(data.results));
    }
  },[selectedGenre]);


  return (
    <div style={{ padding: '1rem '}}>
      <h1>Trending Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/*create MovieCard for each movie*/}
        {trending.map((movie)=>{
          return <MovieCard key={movie.id} movie={movie}/>
        })}
      </div>

      <h2>Select Genre</h2>
      
    </div>
  );
}

export default App;
