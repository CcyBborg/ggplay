const mongoose = require('mongoose');

const CoachReviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coaches',
        required: true,
    }
});

module.exports = mongoose.model('CoachReviews', CoachReviewSchema)
