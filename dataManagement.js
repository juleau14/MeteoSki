const request = require('request');
const mysql2 = require('mysql2');
const dbConnection = require('./db');
const { map, data } = require('jquery');
const { rescheduleJob } = require('node-schedule');


const getNamesFromDb = () => {

    return new Promise((resolve, reject) => { 
        
        dbConnection.query(`SELECT name FROM stations`, (err, result, fields) => {

            if (err) throw err;
            
            const names = result.map(el => el.name);
            resolve(names);

        });

    });
       
}


const requestSnowConditions = async (stationName) => {          // request des snow conditions d'UNE station

    return new Promise((resolve, reject) => {
        
        var options = {
            method: 'GET',
            url: `https://ski-resort-forecast.p.rapidapi.com/${stationName}/snowConditions`,
            qs: {units: 'm', el: 'top'},
            headers: {
                'X-RapidAPI-Key': 'bfecc8036emsh62a26a699b53913p109d58jsn52aea8b3efb7',
                'X-RapidAPI-Host': 'ski-resort-forecast.p.rapidapi.com',
                useQueryString: true
            }
        };

        request(options, function (error, response, body) {

            if (error) throw new Error(error);

            resolve(body);

        });

    });

}


const updateSnowConditions = (stationName, snowConditionsData) => {         // maj de la DB d'UNE station

    return new Promise((resolve, reject) => {

        dbConnection.query(`UPDATE stations SET snowConditions='${snowConditionsData}' WHERE name='${stationName}'`, (err, result, fields) => {

            if (err) throw err;
            console.log(`Snow condition updated for ${stationName}`);
            resolve();

        });
        
    });

}


const fullUpdateStation = (stationName) => {              // maj complete d'UNE    station (requete ET maj mysql)

    return new Promise(async (resolve, reject) => {
        const snowConditionsData = await requestSnowConditions(stationName);
        console.log(snowConditionsData, '\n');
        await updateSnowConditions(stationName, snowConditionsData);

        console.log(`${stationName} full updated.`);

        resolve();
         
    });
    
}


const fullUpdateAllStations = async () => {

    const stationNames = await getNamesFromDb();

    console.log(`Noms : ${stationNames}`);

    for (let i = 0; i < stationNames.length; i++) {
        console.log(`Maj de ${stationNames[i]}`)
        await fullUpdateStation(stationNames[i]);
    }

    console.log(`All stations updated !!!`);

}


const getAllStationsFromDb = () => {

    return new Promise((resolve, reject) => {
        
        dbConnection.query(`SELECT * FROM stations;`, (err, result, fields) => {

            if (err) throw err;

            var data = {
                stations: []
            }

            for (let i = 0; i < result.length; i++) {
                result[i].snowConditions = JSON.parse(result[i].snowConditions);
                data.stations.push(result[i]);
            }

            resolve(data);

        });

    });

}


const getOneStationFromDb = (stationName) => {

    return new Promise((resolve, reject) => {
        dbConnection.query(`SELECT * FROM stations WHERE name='${stationName}'`, (err, result, fields) => {
            if (err) throw err;
            result[0].snowConditions = JSON.parse(result[0].snowConditions);
            resolve(result[0]);
        });
    })

}


const makeDataForInfoPage = (stationName) => {

    return new Promise( async (resolve, reject) => {
        
        var data = {};

        data.allStationsNames = await getNamesFromDb();
        data.searchedStation = await getOneStationFromDb(stationName);
        data.allComments = [];

        resolve(data);

    })

}


module.exports = {
    fullUpdateAllStations,
    getOneStationFromDb,
    getAllStationsFromDb,
    makeDataForInfoPage,
};
