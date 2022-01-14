const mongoose = require('mongoose');

const CourseLessonSchema = mongoose.Schema({
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});

module.exports = mongoose.model('CourseLessons', CourseLessonSchema)
