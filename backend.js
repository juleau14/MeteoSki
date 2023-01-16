const request = require('request');
const mysql2 = require('mysql2');
const dbConnection = require('./db');
const { map } = require('jquery');


const getNamesFromDb =  () => {

    return new Promise((resolve, reject) => { 
        
        dbConnection.query(`SELECT name FROM stations`, (err, result, fields) => {

            if (err) throw err;
            
            const names = result.map(el => el.name);
            resolve(names);

        });

    });
       
}

const requestForecast = async (stationName) => {                // request du forecast d'UNE station
    
    return new Promise((resolve, reject) => {

        const options = {
            method: 'GET',
            url: `https://ski-resort-forecast.p.rapidapi.com/${stationName}/forecast`,
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


const requestSnowConditions = async (stationName) => {          // request des snow conditions d'UNE station

    return new Promise((resolve, reject) => {
        
        const options = {
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


const updateSnowConditions


const fullUpdateStation = async (stationName) => {              // maj complete d'UNE station (requete ET maj mysql)

}