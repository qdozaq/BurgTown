'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
    name: {type: String, required: true, max: 3},
    score: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Score', ScoreSchema);