const mysql2 = require('mysql2');


const dbConnection = mysql2.createConnection({   
    host: 'localhost',
    user: 'juleau',
    password: 'LeCafePop',
    database: 'skidb',
});

dbConnection.connect( (err) => {
    if (err) throw err;
    console.log("You are connected to DB");
});



module.exports = dbConnection