const Movie = require('../model/movieModel');
const Salas = require('../model/salasModel');
const Funcion = require('../model/funcionModel');

exports.getFuncionInfo = async (req, res) => {
    try {
        console.log("asdasd")
        console.log(req.params.idFuncion)
        const funciones = new Funcion(req.data);
        let resFunciones = await funciones.getFuncionById(req.params.idFuncion);

        const movie = new Movie(req.data);
        let resMovie = await movie.getMovieById(resFunciones.data[0].pelicula_id);

        const salas = new Salas(req.data);
        let resSalas = await salas.getSalaById(resFunciones.data[0].sala_id);

        resFunciones.data[0].peliculaInfo = resMovie.data[0]
        resFunciones.data[0].salaInfo = resSalas.data

        if(resFunciones.status == 200) return res.status(resFunciones.status).json(resFunciones);
        return res.status(resFunciones.status).json(resFunciones.data[0]);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}
