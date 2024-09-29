const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class funcion extends connectMongodb{
    constructor(data){
        super(data);
    }

    async getFuncionesBySalaAndMovie(idPelicula, idSala){
        try{
            await this.connectOpen();
            const collection = this.db.collection('funcion');
            let res = await collection.find({pelicula_id: new ObjectId(idPelicula), sala_id: new ObjectId(idSala)}).toArray();
            if(!res) return {status: 404, message: "No Funtions aviable"}
            return {status: 200, message: "List of fuctions found.", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Function not fetched", err}));
        }
    }

    async getFuncionById(idFuncion){
        try{
            await this.connectOpen();
            const collection = this.db.collection('funcion');
            console.log(idFuncion);
            let res = await collection.find({_id: new ObjectId(idFuncion)}).toArray();
            if(!res) return {status: 404, message: "No Function aviable"}
            return {status: 200, message: "Function Found Succesfully.", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Function not fetched", err}));
        }
    } 

}