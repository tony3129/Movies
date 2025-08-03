//setup dependencies
const express = require('express');
const axios = require('axios');
const router = express.Router();

//api key stored in .env file (not accessible on github)
const TMDB_API_KEY = process.env.TMDB_API_KEY;

//api request for trending movies for current week
router.get('/trending', async (req, res) => {
    try{
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
            params: { api_key: TMDB_API_KEY }
        });
        res.json(response.data);
    } catch(err){
        res.status(500).json({ error: 'Failed to fetch trending movies'})
    }
});

//api request for movies by genre
router.get('/genres', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: { api_key: TMDB_API_KEY }
        })
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies by genre'})
    }
})

//api request for movies by selected genre
router.get('/genres/:genreID', async (req, res) =>{
    try{
        const { genreID } = req.params;
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: { 
                api_key: TMDB_API_KEY,
                with_genres: genreID
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies by selected genre'})
    }
})

//api request for movies by search parameter
router.get('search', async (req,res)=>{
    try{
        const { query } = req.params;
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: TMDB_API_KEY,
                query
            }
        })
    }
})

module.exports = router;