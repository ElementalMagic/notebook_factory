const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodtype = new Schema({
    title:{
        type: String,
        required: true
    },
    specs:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        required: true
    },
    portfolioNumber:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('portfolio', prodtype);
