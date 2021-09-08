const express = require('express');

const { createChannel } = require('../discord-client');
const LessonSlot = require('../models/LessonSlot');
const Review = require('../models/Review');
const { ensureAuthenticated } = require('../middleware');

const router = express.Router();

router.post('/book', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.body.slotId
        }).populate('lesson');

        if (lessonSlot.user) {
            throw new Error('Запись уже занята');
        }

        lessonSlot.user = req.user.id;
        req.user.slots.push(lessonSlot['_id'])

        const channelName = `${req.user.nickname} ${String(lessonSlot._id).slice(0, 4)}`;
        const invite = await createChannel(channelName, lessonSlot.lesson.maxParticipants);
        lessonSlot.invite = invite;
        lessonSlot.channel = channelName;

        await lessonSlot.save();
        await req.user.save();

        res.send('Booked');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/:slotId/review', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.params.slotId,
            'user': req.user.id
        }).populate('lesson');

        if (!lessonSlot) {
            throw new Error('Нет такого слота');
        }

        console.log(req.body);
        
        let review = new Review({
            slot: lessonSlot,
            rating: req.body.rating,
            comment: req.body.comment
        });

        review = await review.save();

        lessonSlot.review = review._id;
        await lessonSlot.save();

        res.send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
