const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predictionSchema = new Schema({
    predictionType: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: '',
    }
},{
    timestamps: true
});

module.exports = mongoose.model('prediction', predictionSchema);