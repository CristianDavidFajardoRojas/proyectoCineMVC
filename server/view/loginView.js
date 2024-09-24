const layout = require('express').Router();
const { join } = require('path');
const cookieParser =  require('cookie-parser');
//const { authLogged } =  require('../middleware/authCookies');

layout.get("/", cookieParser(), (req, res)=>{ //authLogged
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/view/logIn.html'));
})


module.exports = layout;