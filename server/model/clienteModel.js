const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class Cliente extends connectMongodb{
    constructor(data){
        super(data);
    }

    async findOneUserByNick(nickname){
        try{
            await this.connectOpen();
            const collection = this.db.collection('cliente');
            let [res] = await collection.find({nickname: nickname}).project().toArray();
            if(!res) return {status: 404, message: "Email not registered in the database"}
            return {status: 200, message: "Email Found", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Email not fetched", err}));
        }
    }


}