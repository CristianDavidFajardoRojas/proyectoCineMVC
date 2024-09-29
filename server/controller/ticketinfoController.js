const Movie = require('../model/movieModel');
const Salas = require('../model/salasModel');
const Funcion = require('../model/funcionModel');
const Cliente = require('../model/clienteModel');
const Ticket = require('../model/ticketModel');

const { ObjectId } = require('mongodb');

exports.getTicketInfo = async (req, res) => {
    try {

        const ticketInfo = new Ticket(req.data);
        let resTicketInfo = await ticketInfo.getTicketById(req.params.id);

        const funciones = new Funcion(req.data);
        let resFunciones = await funciones.getFuncionById(resTicketInfo.data[0].funcion_id);
        resTicketInfo.data[0].funcionInfo = resFunciones.data[0]

        const movie = new Movie(req.data);
        let resMovie = await movie.getMovieById(resTicketInfo.data[0].funcionInfo.pelicula_id);
        resTicketInfo.data[0].movieInfo = resMovie.data[0]

        const salas = new Salas(req.data);
        let resSalas = await salas.getSalaById(resTicketInfo.data[0].funcionInfo.sala_id);
        resTicketInfo.data[0].salaInfo = resSalas.data;

        if(resTicketInfo.status == 200) return res.status(resTicketInfo.status).json(resTicketInfo.data[0]);
        return res.status(resTicketInfo.status).json(resTicketInfo.data[0]);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}


