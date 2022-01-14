const express = require('express');

const Comment = require('../models/Comment');
const CourseLesson = require('../models/CourseLesson');
const { ensureAuthenticated } = require('../middleware');

const router = express.Router();

router.get('/:lessonId', async (req, res) => {
    try {
        const comments = await Comment.find({
            'lesson': req.params.lessonId
        }).populate('user').sort('createdAt');

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
        const courseLesson = CourseLesson.findOne({ _id: req.body.lesson });

        let comment = new Comment({
            user: req.user.id,
            comment: req.body.comment,
            courseLesson: courseLesson._id,
            createdAt: new Date()
        });
        comment = await comment.save();

        courseLesson.comments.push(comment._id);
        await courseLesson.save();

        res.send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
