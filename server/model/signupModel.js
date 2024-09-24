const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class User extends connectMongodb{
    constructor(){
        super();
    }


    async findExistNickname(nickname){
        try{
            await this.connectOpen()
            let database = await this.db;
            let result = await database.command({
            usersInfo: nickname,
            showCredentials: false
        });
        if(result.users.length === 0) return {status: 404, message: "Nickname not registered in the database"}
        return {status: 200, message: "Nickname Found"}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Nickname not fetched", err}));
        }
    }



    async findExistEmail(email){
        try{
            await this.connectOpen();
            const collection = this.db.collection('cliente');
            let [res] = await collection.find({email: email}).project({_id: 1}).toArray();
            if(!res) return {status: 404, message: "Email not registered in the database"}
            return {status: 200, message: "Email Found", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Email not fetched", err}));
        }
    }


    async insertCollection(data){
        try{
            let {nickname, name: nombre, email, password} = data    
            await this.connectOpen();
            const collection = this.db.collection('cliente');
            let res = await collection.insertOne({nickname, nombre, email, password, suscripcion_id: null});
            return {status: 201, message: "User added succesfully", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Client not fetched", err}));
        }
    }



    async createUser(nickname, password, rol = "cliente") {
        try {
            await this.connectOpen();
            const res = await this.db.command({
                createUser: nickname,
                pwd:`${password}`,
                roles: [{role: rol, db: process.env.MONGO_DB_NAME}]
            });
            return { status: 201, message: "User created successfully in the database", data: res };
        } catch(error){
            throw new Error(JSON.stringify({status: 500, message: "Cannot create user in the data base", error}));
        }
    }
}