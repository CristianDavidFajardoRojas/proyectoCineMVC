const { MongoClient } = require('mongodb');
module.exports = class connectMongodb {
    db;
    con;
    user;
    #password;
    #rol

    constructor({ user = process.env.MONGO_USER, pwd = process.env.MONGO_PSW, rol = "admin users", nick } = {}) {
        this.user = rol == "admin users" ? user : nick; 
        this.#password = pwd;
        this.setRol = rol;
        
    }

    async connectOpen() {
        try {
            const url = `${process.env.MONGO_PROTOCOL}${this.getUser}:${this.getPassword}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}${(this.getRol != "admin users") ? `/${process.env.MONGO_DB_NAME}` : ''}`
            this.con = new MongoClient(url);
            await this.con.connect();
            this.db = this.con.db(process.env.MONGO_DB_NAME);
        } catch (error) {
            this.con = undefined;
            throw new Error(JSON.stringify({ status: 500, message: "Error connecting to database", error }));
        }
    }

    set setUser(user) {
        this.user = user;
    }

    get getUser() {
        return this.user;
    }

    set setPassword(pwd) {
        this.#password = pwd;
    }

    get getPassword() {
        return this.#password;
    }

    set setRol(rol) {
        this.#rol = rol;
    }

    get getRol() {
        return this.#rol;
    }
};