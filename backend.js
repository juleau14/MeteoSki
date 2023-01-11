const request = require('request');
const mysql2 = require('mysql2');
const dbConnection = require('./db');
const { map } = require('jquery');


const getNamesFromDb = () => {

    return new Promise((resolve, reject) => {
        
        dbConnection.query(`SELECT name FROM stations;`, (err, rows, fields) => {

            if (err) throw err;

            console.log("Noms bien récupérés de la base de données.");

            resolve(rows);

        });

    });

}


const requestData = (stationName) => {
    
    return new Promise((resolve, reject) => {
        
        const options = {
            method: 'GET',
            url: `https://ski-resort-forecast.p.rapidapi.com/${stationName}/snowConditions`,
            qs: {units: 'm'},
            headers: {
              'X-RapidAPI-Key': 'bfecc8036emsh62a26a699b53913p109d58jsn52aea8b3efb7',
              'X-RapidAPI-Host': 'ski-resort-forecast.p.rapidapi.com',
              useQueryString: true
            }
        };

        console.log(`Requête envoyée pour les données de ${stationName}`);

        request(options, (err, res, body) => {

            if (err) throw err;

            console.log("Nous avons bien recu les données de la station "+stationName+".");

            resolve(JSON.parse(body));

        });

    })

}


const updateTopSnow = (newValue, stationName) => {

    return new Promise((resolve, reject) => {
        
        dbConnection.query(`UPDATE stations SET topsnow='${newValue}' WHERE name='${stationName}';`, (err) => {

            if (err) throw err;

            console.log('Topsnow mis à jour pour '+stationName+'.');

            resolve();

        });

    })

}


const updateBotSnow = (newValue, stationName) => {

    return new Promise((resolve, reject) => {
        
        dbConnection.query(`UPDATE stations SET botsnow='${newValue}' WHERE name='${stationName}';`, (err) => {

            if (err) throw err;

            console.log('Botsnow mis à jour pour '+stationName+'.');

            resolve();

        });

    })

}


const updateDb = async (stationData, stationName) => {

    return new Promise((resolve, reject) => {
        
        (async () => {

            await updateTopSnow(stationData.topSnowDepth, stationName);
            await updateBotSnow(stationData.botSnowDepth, stationName);

            resolve(`Les données de ${stationName} ont bien été mises à jours.`);

        })();

    })

}


const updateData = async () => {

    const namesFromDb = await getNamesFromDb();

    const names = namesFromDb.map(el => el.name);   // names = ['name1', 'names2', ...]

    for (let i = 0; i < names.length; i++) {

        var stationName = names[i];

        var stationData = await requestData(names[i]);      // stationData = JSON

        var updateMessage = await updateDb(stationData, stationName);

        console.log(updateMessage, '\n\n');

    }

}


updateData();