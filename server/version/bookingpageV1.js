const bookingpageController = require('../controller/bookingpageController');
const express = require('express');
const movieDetail = express();
const cookieParser = require('cookie-parser');

movieDetail.get("/:id/:idSala", cookieParser(), express.json(), bookingpageController.searchMovieAndSalaById); 

module.exports = movieDetail;