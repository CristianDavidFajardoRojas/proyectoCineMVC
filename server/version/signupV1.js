const controlerSignup = require('../controller/signupController');
const express = require('express');
const account = express();

account.post("/", express.json(), controlerSignup.createUser);

module.exports = account;