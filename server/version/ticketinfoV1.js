const ticketinfoController = require('../controller/ticketinfoController');
const express = require('express');
const ticketInfo = express();
const cookieParser = require('cookie-parser');

ticketInfo.get("/:id", cookieParser(), express.json(), ticketinfoController.getTicketInfo); 

module.exports = ticketInfo;