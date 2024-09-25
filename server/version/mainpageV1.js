const controllerMainPage = require('../controller/mainpageController');
const express = require('express');

const movie = express();

movie.get("/", controllerMainPage.search);

module.exports = movie;