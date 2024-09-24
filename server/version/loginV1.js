const controlerLogin = require('../controller/loginController');
const express = require('express');
const logIn = express();
const cookieParser = require('cookie-parser');

logIn.post("/", cookieParser(), express.json(), controlerLogin.login);

module.exports = logIn;