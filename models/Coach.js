const mongoose = require('mongoose');

const CoachSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    about: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games',
        required: true
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lessons'
    }],
    tags: [String],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
});

module.exports = mongoose.model('Coaches', CoachSchema)
