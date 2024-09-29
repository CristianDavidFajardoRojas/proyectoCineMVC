const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class Ticket extends connectMongodb{
    constructor(data){
        super(data);
    }


    async insertCollection(data){
        try{
            let ticketInsert = {};
            ticketInsert._id = new ObjectId(data.ticket._id);
            ticketInsert.funcion_id = new ObjectId(data.ticket.function_id);  
            ticketInsert.cliente_id = new ObjectId(data.ticket.cliente_id);
            ticketInsert.asientos = data.ticket.asientos;
            ticketInsert.precio = data.ticket.precio;
            ticketInsert.fecha_compra = new Date();
            console.log(ticketInsert);  
            
            
            await this.connectOpen();
            let collection = this.db.collection('ticket');
            let res = await collection.insertOne(ticketInsert);
            collection = this.db.collection('funcion');
            ticketInsert.asientos.forEach( asiento=>{collection.updateOne({_id: ticketInsert.funcion_id}, { $push: { asientos_ocupados: asiento }})});
            return {status: 201, message: "Ticket added succesfully", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Ticket not fetched", err}));
        }
    }
    


    async getTicketById(id){
        try{
            await this.connectOpen();
            const collection = this.db.collection('ticket');
            let res = await collection.find({_id: new ObjectId(id)}).toArray();
            if(!res) return {status: 404, message: "No Ticket aviable"}
            return {status: 200, message: "Ticket Found Succesfully.", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Ticket not fetched", err}));
        }
    }



}














