const express = require('express');
const path = require('path');
const dataManagement = require('./dataManagement');

const router = express.Router();


router.get('/home', async (req, res) => {

    const data = await dataManagement.makeDataForHomepage();
    res.render('home.hbs', data);

});


router.post('/home', (req, res) => {

    res.redirect(`/infos/${req.body.search}`);

});


router.get('/infos', (req, res) => {
    res.render('station_info.hbs');
})


router.get('/infos/:stationName', async (req, res) => {
    const stationName = req.params.stationName;
    const data = await dataManagement.makeDataForInfoPage(stationName);
    res.render('station_infos.hbs', data);
})


// any other url redirect to home 
router.use('*', (req, res, next) => {
    res.redirect('/home');

    next();
})



module.exports = router;