//set up dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const movieRoutes = require('./routes/movies');

//load .env variables globally
dotenv.config();

//mount 
const app = express();
//restrict access to only my frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api', movieRoutes)

//set localhost port to 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhose:${PORT}`)
})