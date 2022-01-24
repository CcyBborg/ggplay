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
            status: 'placed',
            type: 'lesson'
        });

        order = await order.save();

        const price = lessonSlot.lesson.price * 100;

        const response = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
            TerminalKey: process.env.TERMINAL_DEV_KEY,
            Amount: price,
            Description: lessonSlot.lesson.title,
            OrderId: order._id,
            Receipt: {
                Email: req.user.email || 'ggplay@ggplay.ru',
                EmailCompany: 'ggplay@ggplay.ru',
                Taxation: 'usn_income',
                Items: [{
                    Name: lessonSlot.lesson.title,
                    Quantity: 1,
                    Amount: price,
                    Price: price,
                    Tax: 'none'
                }]
            }
        });

        if (response.data.Success) {
            res.json({
                url: response.data.PaymentURL
            });
        } else {
            console.log(response);
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
