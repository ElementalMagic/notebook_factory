const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodtype = new Schema({
    name:{
        type: String,
        required: true
    },
    htmlCode:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    draftNumber:{
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
    },
    title:{
        type: String,
        required: true
    },
    clicks:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('draft', prodtype);
