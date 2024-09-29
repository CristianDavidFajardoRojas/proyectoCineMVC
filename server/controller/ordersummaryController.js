const Movie = require('../model/movieModel');
const Salas = require('../model/salasModel');
const Funcion = require('../model/funcionModel');
const Cliente = require('../model/clienteModel');
const Ticket = require('../model/ticketModel');

const { ObjectId } = require('mongodb');

exports.getFuncionInfo = async (req, res) => {
    try {
        const funciones = new Funcion(req.data);
        let resFunciones = await funciones.getFuncionById(req.params.idFuncion);

        const movie = new Movie(req.data);
        let resMovie = await movie.getMovieById(resFunciones.data[0].pelicula_id);

        const salas = new Salas(req.data);
        let resSalas = await salas.getSalaById(resFunciones.data[0].sala_id);

        const cliente = new Cliente(req.data);
        let resCliente = await cliente.findOneUserByNick(req.data.nickname);

        resFunciones.data[0].peliculaInfo = resMovie.data[0]
        resFunciones.data[0].salaInfo = resSalas.data
        resFunciones.data[0].idTicket = new ObjectId();
        resFunciones.data[0].clienteInfo = resCliente.data;
        

        if(resFunciones.status == 200) return res.status(resFunciones.status).json(resFunciones);
        return res.status(resFunciones.status).json(resFunciones.data[0]);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}


exports.postTicket = async (req, res) => {
    try {
        
        const ticket = new Ticket(req.data);
        let resFunciones = await ticket.insertCollection(req.body);
        
        if(resFunciones.status == 201) return res.status(resFunciones.status).json(resFunciones);
        return res.status(resFunciones.status).json(resFunciones.data[0]);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}
