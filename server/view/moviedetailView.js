const layout = require('express').Router();
const { join } = require('path');
const cookieParser =  require('cookie-parser');
const { authMainPage } =  require('../middleware/authMain');

layout.get("/", cookieParser(), authMainPage, (req, res)=>{ 
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/view/movieDetail.html'));
})


module.exports = layout;