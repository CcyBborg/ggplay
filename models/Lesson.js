const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coaches',
        required: true
    },
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonSlots'
    }]
});

module.exports = mongoose.model('Lessons', LessonSchema)
