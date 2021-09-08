const mongoose = require('mongoose');

const LessonSlotSchema = mongoose.Schema({
    timestamp: {
        type: String,
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lessons',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    invite: {
        type: String,
    },
    channel: {
        type: String
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }
});

module.exports = mongoose.model('LessonSlots', LessonSlotSchema)
