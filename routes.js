const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const router = express.Router();
module.exports = router;


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


router.use('/home', (req, res) => {

    dbConnection.query(`SELECT * FROM stations`, (err, rows, fields) => {

        let data = { 
            "stations": {

            },
        };

        for (let i = 0; i < rows.length; i++) {
            data["stations"]["station"+(i+1).toString()] = rows[i];
        }

        
        res.render('home', data);

    });


});


router.use('/details', (req, res) => {
    res.render('station_info.hbs');
})



// any other url redirect to home 
router.use('*', (req, res, next) => {
    res.redirect('/home');

    next();
})
