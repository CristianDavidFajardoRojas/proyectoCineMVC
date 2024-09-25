const bcrypt = require('bcrypt');
const Movie = require('../model/movieModel'); 

exports.search = async (req, res) => {
    try {
        const movie = new Movie(req.data);
        
        let resMovies = await movie.getMoviesCollection();

        const tokenCookie = req.cookies.token;
        const cookieData = JSON.parse(tokenCookie).data;
        resMovies.cookie = cookieData

        if(resMovies.status == 200) return res.status(resMovies.status).json(resMovies);
        return res.status(resMovies.status).json(resMovies);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}
