const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseLessons',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Comments', CommentSchema)
