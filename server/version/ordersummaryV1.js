const orderSummaryController = require('../controller/ordersummaryController');
const express = require('express');
const orderSummary = express();
const cookieParser = require('cookie-parser');

orderSummary.get("/:idFuncion", cookieParser(), express.json(), orderSummaryController.getFuncionInfo); 

module.exports = orderSummary;