const express = require('express');

const Comment = require('../models/Comment');
const CourseLesson = require('../models/CourseLesson');
const { ensureAuthenticated } = require('../middleware');

const router = express.Router();

router.get('/:lessonId', async (req, res) => {
    try {
        const comments = await Comment.find({
            'lesson': req.params.lessonId
        }).populate('user').sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/:lessonId', ensureAuthenticated, async (req, res) => {
    try {
        const courseLesson = await CourseLesson.findOne({ _id: req.params.lessonId });

        let comment = new Comment({
            user: req.user._id,
            comment: req.body.comment,
            lesson: courseLesson._id,
            createdAt: new Date()
        });
        comment = await comment.save();

        courseLesson.comments.push(comment._id);
        await courseLesson.save();

        comment = await Comment.findOne({
            _id: comment._id
        }).populate('user');

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
