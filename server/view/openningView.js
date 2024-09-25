const layout = require('express').Router();
const { join } = require('path');
const cookieParser =  require('cookie-parser');
const { authLogged } =  require('../middleware/authCookies');

layout.get("/", cookieParser(), authLogged, (req, res)=>{ 
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/view/openning.html'));
})


module.exports = layout;