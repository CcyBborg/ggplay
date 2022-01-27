const mongoose = require('mongoose');

const Tournament = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    info: {
        type: Object
    }
});

module.exports = mongoose.model('Tournaments', Tournament)
