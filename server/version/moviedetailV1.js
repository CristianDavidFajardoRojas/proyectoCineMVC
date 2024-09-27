const controlerDetail = require('../controller/moviedetailController');
const express = require('express');
const movieDetail = express();
const cookieParser = require('cookie-parser');

movieDetail.get("/:id", cookieParser(), express.json(), controlerDetail.searchById); 

module.exports = movieDetail;