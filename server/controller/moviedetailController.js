const bcrypt = require('bcrypt');
const Movie = require('../model/movieModel'); 

exports.searchById = async (req, res) => {
    try {
        const movie = new Movie(req.data);
        
        let resMovie = await movie.getMovieById(req.params.id);

        if(resMovie.status == 200) return res.status(resMovie.status).json(resMovie);
        return res.status(resMovie.status).json(resMovie);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}
