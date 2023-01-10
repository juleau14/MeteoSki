
const mysql = require('mysql2');
const request = require('request');



const updateData = async () => {

    const dbConnection = mysql.createConnection({   // create connection object to db
        host: 'localhost',
        user: 'juleau',
        password: 'LeCafePop',
        database: 'skidb',
    });
    
    dbConnection.connect( (err) => {
        if (err) throw err;
        console.log("You are connected to DB");
    });
    
    dbConnection.query(`SELECT name FROM stations`, (err, rows, fields) => {    // get all station names from db (stored in rows in array of JSONs)

        let names = rows.map( obj => obj["name"]);      // making array with all names 

        (async () => {
            for (let i = 0; i < names.length; i++) {        // for each name we request data from api and update db with it

                // we absolutely need to wait for previous request to api
                // to be finished before launching another one or it is DEATH
                // so we make a promise 

                let promise = new Promise( (resolve, reject) => {

                    const options = {           // here are the options we gonna use to send req to api 
                        method: 'GET',
                        url: `https://ski-resort-forecast.p.rapidapi.com/${names[i]}/snowConditions`,
                        qs: {units: 'm'},
                        headers: {
                        'X-RapidAPI-Key': 'bfecc8036emsh62a26a699b53913p109d58jsn52aea8b3efb7',
                        'X-RapidAPI-Host': 'ski-resort-forecast.p.rapidapi.com',
                        useQueryString: true
                        }
                    };

                    request(options, (err, res, body) => {

                        const snowData = JSON.parse(body);

                        const stationName = snowData.basicInfo.name;
                        const topSnow = snowData.topSnowDepth;
                        const botSnow = snowData.botSnowDepth;

                        console.log(stationName, topSnow, botSnow);

                        dbConnection.query(`UPDATE stations SET topsnow='${topSnow}' WHERE name='${names[i]}';`, (err) => {
                            if (err) throw err;
                            console.log('Updated topsnow for '+stationName);
                        });
                        
                        dbConnection.query(`UPDATE stations SET botsnow='${botSnow}' WHERE name='${names[i]}';`, (err) => {
                            if (err) throw err;
                            console.log('Updated botsnow for '+stationName);
                        });


                        resolve("OK");

                    })

                });

                await promise;
               
            }

        })();

        

    });

}


module.exports = updateData;