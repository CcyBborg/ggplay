const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonSlots',
        required: true
    }
});

module.exports = mongoose.model('Reviews', ReviewSchema)
