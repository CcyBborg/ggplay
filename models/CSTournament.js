const mongoose = require('mongoose');

const CSTournament = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    steam: {
        type: String,
        required: true
    },
    social: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    faceit: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CSTournaments', CSTournament)
