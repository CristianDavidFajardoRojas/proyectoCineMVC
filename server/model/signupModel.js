const  connectMongodb  = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class User extends connectMongodb{
    constructor(){
        super();
    }

    
}