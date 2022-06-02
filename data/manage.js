const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const constants = require('../constants');

const predictionAdapter = new FileSync('data/predictByCategory.json');
const signPrediction = new FileSync('data/signPrediction.json');
const tarotPrediction = new FileSync('data/tarotPrediction.json');

 
let str = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor. At vero eos et accusam et justo duo dolores et ea rebum.`


module.exports = {
    predictByCategory: function (id) {
        const DATABASE = low(predictionAdapter);

        DATABASE.defaults({ predictByCategory: [] }).write();
        return DATABASE.get('predictByCategory').find({ id: id }).value();
    },

    predictBySign: function (sign, category) {
        const DATABASE = low(signPrediction);
        DATABASE.defaults({ signPrediction: [] }).write();

        let { categories } = DATABASE.get('signPrediction').find({sign}).value();
        let prediction = categories.find(item => Object.keys(item)[0] === category);
        if (prediction[category]['prediction']) {
            return prediction[category]['prediction'];
        } else return '';
    },

    predictByTarot: function (cardId, category) {
        const DATABASE = low(tarotPrediction);
        DATABASE.defaults({ tarotPrediction: [] }).write();

        let { categories } = DATABASE.get('tarotPrediction').find({cardId: Number(cardId)}).value();
        let prediction = categories.find(item => Object.keys(item)[0] == category);
        if (prediction[category]['prediction']) {
            return prediction[category]['prediction'];
        } else return '';
    }
}

/**
 * 
 * @description: demo function populating demo data for predictBySign
 */
function populateSignPredictionData (DATABASE) {
    constants.validSigns.forEach((sign, index) => {
        let key = Object.keys(sign)[0];
        let Obj = []
        constants.horoscopeCategories.forEach((category, index) => {
            let field = Object.keys(category)[0];
            Obj.push({ [field]: { id: index + 1, prediction: str + '\n' + str} })
        });
        DATABASE.get('signPrediction')
                .push({ sign: key, 'categories': Obj })
                .write();
    })
}

/**
 * 
 * @description: demo function for populating demo data for predictByTarot
 */
function populatePredictByTarot (DATABASE) {
        for (let i = 1; i <= 40; i++) {
            let Obj = []
            constants.horoscopeCategories.forEach((sign, index) => {
                let key = Object.keys(sign)[0];
                Obj.push({ [key]: { id: index + 1, prediction: str + '\n' + str} })
            })
            DATABASE.get('tarotPrediction')
                    .push({ cardId: i, 'categories': Obj})
                    .write();
            
        }
    }
