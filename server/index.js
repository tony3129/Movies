//load .env variables
const dotenv = require('dotenv').config();
//set up dependencies
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movies');

//mount 
const app = express();
//restrict access to only my frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api', movieRoutes);

//set localhost port to 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})