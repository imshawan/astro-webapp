const express = require('express');
const path = require('path');
const router = express.Router();
const constants = require('../constants');
const manage = require('../data/manage');
const { titleCase, to_base } = require('../utilities');
const Prediction = require('../models/prediction');

const predictionTypes = ['name', 'phone_number', 'id_card', 'car_number', 'account_number'];
const notFound = {
    title: "Not Found",
    message: "404",
    status: "Page Not Found",
    stack: "The page that you requested for was not found on this server!",
  }

const companyDetails = constants.companyDetails;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Home', ...companyDetails });
});

router.get('/zodiacsign/:page?', async function(req, res, next) {
    if (!req.params.page) return res.redirect(req.url + '/love');
    if (!req.query.value) return res.render('zodiacsign', { title: 'Zodiac Sign', ...companyDetails });

    const { page } = req.params;
    const { value } = req.query;
    let signField = titleCase(value);
    let category = titleCase(page);

    const validSign = constants.validSigns.find(sign => Object.keys(sign)[0] === signField);
    if (!validSign) return res.render("error", notFound);

    const pageData = {...companyDetails};

    pageData.title = 'View Prediction';
    pageData.signImage = `<img src="/images/${validSign[signField]}" alt="">`;
    pageData.signName = signField;
    pageData.otherHoroscopeClass = 'other-horoscopes-cards-container';
    pageData.prediction = manage.predictBySign(signField, category);


    res.render('view_prediction', pageData);
});

router.get('/numerology/:page?', function(req, res, next) {
    if (!req.params.page) return res.redirect(req.url + '/name');
    res.render('numerology', { title: 'Numerology', ...companyDetails });
});

router.get('/tarotcard/:page?', function(req, res, next) {
    if (!req.params.page) return res.redirect(req.url + '/love');
    res.render('tarotcard', { title: 'Tarot card', ...companyDetails });
});

router.post('/:page/:subpage/view', async function(req, res, next) {
    const { page, subpage } = req.params;
    const { value } = req.body;
    let number = 0;

    if (!constants.validPages.includes(page)) return res.render("error", notFound);
    if (!value) return res.render("error", {
        title: "Bad Request",
        status: "No data was provided",
    });
    
    if (!value) {
        return res.render('error', { title: 'Error', status: 'Invalid data supplied' });
    }
    if (value && !Array.isArray(value)) {
        let values = value.split('');
        values.forEach(val => {
            if (isNaN(val)) {
                number += val.charCodeAt(0);
            } else {
                number += Number(val);
            }
        })
        let base = to_base(values.length, number);
        if (base.length) number = base.reduce((prev, next) => prev += next)
        
    } 

    const pageData = {...companyDetails};
    let predictionValue;

    if (page == 'tarotcard' && Array.isArray(value)) {
        pageData.getReadings = true;
        pageData.readings = [];
        value.forEach(item => {
            let prediction = manage.predictByTarot(item, titleCase(subpage));
            let card = constants.tarotCards.find(card => card.id == item);
            if (card) pageData.readings.push({...card, prediction, image: '/cards/' + card.image});
        })
    } else {
        let { prediction } = manage.predictByCategory(number);
        predictionValue = prediction;
    }
    const payload = {
        predictionType: subpage,
        value
    };
    pageData.title = 'View Prediction';
    pageData.prediction = predictionValue;
    pageData.otherHoroscopeClass = "other-horoscopes-cards-container";
    pageData.signImage = `<img src="/images/${subpage.replace('_', '-')}.png" alt="">`;

    if (page == "numerology") {
        pageData.otherHoroscopeClass = "predict-horoscopes-cards-container";
        pageData.signImage = "";
        pageData.marginClass = "sign-name";
    }
    pageData.signName = titleCase(subpage.split('_').join(' '));

    if (predictionTypes.includes(subpage)) {
        const predictionStore = new Prediction(payload);
        await predictionStore.save();
    }

    res.render('view_prediction', pageData);
});

router.get('/*', function(req, res, next) {
    res.render('error', notFound);
});


module.exports = router;
