const express = require('express');
const axios = require('axios');

const LessonSlot = require('../models/LessonSlot');
const Review = require('../models/Review');
const { ensureAuthenticated } = require('../middleware');
const Coach = require('../models/Coach');
const Order = require('../models/Order');

const router = express.Router();

router.post('/book', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.body.slotId
        }).populate('lesson');

        if (lessonSlot.user) {
            throw new Error('Запись уже занята');
        }

        let order = new Order({
            slot: lessonSlot._id,
            user: req.user._id,
            status: 'placed'
        });

        order = await order.save();

        const response = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
            TerminalKey: process.env.TERMINAL_KEY,
            Amount: lessonSlot.lesson.price * 100,
            Description: lessonSlot.lesson.title,
            OrderId: order._id
        });

        if (response.data.Success) {
            res.json({
                url: response.data.PaymentURL
            });
        } else {
            throw new Error();
        }
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
        
        let review = new Review({
            slot: lessonSlot,
            rating: req.body.rating,
            comment: req.body.comment
        });

        review = await review.save();

        lessonSlot.review = review._id;
        await lessonSlot.save();

        const coach = await Coach.findOne({ '_id': lessonSlot.lesson.coach });
        coach.reviews.push(review._id)
        await coach.save();

        res.send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
