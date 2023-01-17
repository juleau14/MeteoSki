const express = require('express');
const path = require('path');
const dataManagement = require('./dataManagement');

const router = express.Router();


router.use('/home', async (req, res) => {

    const data = await dataManagement.getFromDb();
    console.log(data);
    res.render('home.hbs', data);

});


router.use('/details', (req, res) => {
    res.render('station_info.hbs');
})



// any other url redirect to home 
router.use('*', (req, res, next) => {
    res.redirect('/home');

    next();
})



module.exports = router;