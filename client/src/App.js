//set up dependenciees
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';

function App() {
  const [trending, setTrending] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  return (
    <></>
  );
}

export default App;
