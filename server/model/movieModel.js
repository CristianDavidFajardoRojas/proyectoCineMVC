const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class movie extends connectMongodb{
    constructor(data){
        super(data);
    }

    async getMoviesCollection(){
        try{
            await this.connectOpen();
            const collection = this.db.collection('pelicula');
            let res = await collection.find().toArray();
            if(!res) return {status: 404, message: "No movies aviable"}
            return {status: 200, message: "List of movies found.", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Email not fetched", err}));
        }
    }

    async getMovieById(id){
        try{
            await this.connectOpen();
            const collection = this.db.collection('pelicula');
            let res = await collection.find({_id: new ObjectId(id)}).toArray();
            if(!res) return {status: 404, message: "Movie Not Found"}
            return {status: 200, message: "Movie Data Found Succesfully", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Movie not fetched", err}));
        }
    }
}