const request = require('request');
const mysql2 = require('mysql2');
const dbConnection = require('./db');


const getNamesFromDb = () => {

    return new Promise((resolve, reject) => {
        
        dbConnection.query(`SELECT * name FROM stations;`, (err, rows, fields) => {

            if (err) throw err;

            console.log("Noms bien récupérés de la base de données.");

            resolve(rows);

        });

    });

}


const updateData = async () => {

    const names = await getNamesFromDb();

    console.log(names);

}


updateData();