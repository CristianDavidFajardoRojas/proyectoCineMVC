const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class movie extends connectMongodb{
    constructor(data){
        super(data);
    }

    async getAllSalas(){
        try{
            await this.connectOpen();
            const collection = this.db.collection('sala');
            let res = await collection.find().toArray();
            if(!res) return {status: 404, message: "No salas aviable"}
            return {status: 200, message: "List of salas found.", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Salas not fetched", err}));
        }
    }
}