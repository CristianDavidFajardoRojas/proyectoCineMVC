const layout = require('express').Router();
const { join } = require('path');
const cookieParser =  require('cookie-parser');

layout.get("/", cookieParser(), (req, res)=>{ 
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/view/mainPage.html'));
})


module.exports = layout;