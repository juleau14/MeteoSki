
const mysql = require('mysql2');
const request = require('request');


const connectToDb = () => {

    return new Promise((resolve, reject) => {
        
        const dbConnection = mysql.createConnection({   // create connection object to db
            host: 'localhost',
            user: 'juleau',
            password: 'LeCafePop',
            database: 'skidb',
        });
        
        dbConnection.connect( (err) => {
            if (err) throw err;
            console.log("You are connected to DB");

            resolve(dbConnection);
        });
    })

}


const getNamesFromDb = (dbConnection) => {
    
    return new Promise((resolve, reject) => {
            
        dbConnection.query(`SELECT name FROM stations`), (err, rows, fields) => {
                console.log("J'ai bien récupéré les noms dans la DB, je peux resolve la promesse avec ces derniers !");
                resolve(rows);
            }

    });

}


const updateData = async () => {

    const dbConnection = await connectToDb();
    
    const names = await getNamesFromDb(dbConnection);

    console.log(names);

}


updateData();

module.exports = updateData;