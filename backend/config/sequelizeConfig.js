const conn = {
    "development": {
        database: "company",
        username:"root",
        password:"",
        host: "localhost",
        port: 3306,
        dialect: "mysql",    
        logging: false
    },
    "test": {
        database: "company",
        username:"root",
        password:"",
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    },
    "production": {
        database: "company",
        username:"root",
        password:"",
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    }

};
module.exports = conn;