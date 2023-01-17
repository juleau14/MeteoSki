const express = require('express');
const dataManagement = require('./dataManagement');
const schedule = require('node-schedule');
const bodyParser = require('body-parser');


const app = express();

const routes = require('./routes');

const job = schedule.scheduleJob('30 * * * *', dataManagement.fullUpdateAllStations);


app.set('view engine', 'hbs');

app.use(express.static('static/'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('*', routes);
app.post('*', routes);

app.listen(3000, () => {
    console.log("App running on port 3000 !");
});