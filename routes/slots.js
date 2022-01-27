const express = require('express');

const LessonSlot = require('../models/LessonSlot');
const Review = require('../models/Review');
const { ensureAuthenticated } = require('../middleware');
const Coach = require('../models/Coach');

const router = express.Router();

router.post('/:slotId/review', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.params.slotId,
            'user': req.user._id
        }).populate('lesson');

        if (!lessonSlot) {
            throw new Error('Нет такого слота');
        }
        
        let review = new Review({
            slot: lessonSlot,
            rating: req.body.rating,
            comment: req.body.comment
        });

        review = await review.save();

        lessonSlot.review = review._id;
        await lessonSlot.save();

        const coach = await Coach.findOne({ '_id': lessonSlot.lesson.coach });
        coach.reviews.push(review._id);
        await coach.save();

        res.json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
