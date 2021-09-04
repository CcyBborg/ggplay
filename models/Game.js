const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    filters: [{
        name: {
            type: String,
            required: true
        },
        tags: [{
            key: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true
            }
        }]
    }]
});

module.exports = mongoose.model('Games', GameSchema)
