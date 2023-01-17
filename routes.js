const express = require('express');
const path = require('path');
const dataManagement = require('./dataManagement');

const router = express.Router();


router.get('/home/:opt/', async (req, res) => {

    const data = await dataManagement.getAllStationsFromDb();
    console.log(req.path);
    res.render('home.hbs', data);

});


router.post('/home', (req, res) => {

    res.redirect(`/infos/${req.body.search}`);

});


router.get('/infos', (req, res) => {
    res.render('station_info.hbs');
})


router.get('/infos/:stationName', async (req, res) => {
    const station = req.params.stationName;
    const data = await dataManagement.makeDataForInfoPage(station);
    console.log(req.path);
    res.render('station_info.hbs', data);
})


// any other url redirect to home 
router.use('*', (req, res, next) => {
    res.redirect('/home');

    next();
})



module.exports = router;