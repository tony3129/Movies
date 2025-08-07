//load .env variables
const dotenv = require('dotenv').config();
//set up dependencies
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movies');

const allowedOrigins = [
  'http://localhost:3000',
  'https://tonys-movies-app-frontend.onrender.com', // render frontend url
];

//mount 
const app = express();
//restrict access to only my frontend
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use('/api', movieRoutes);

//set localhost port to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})