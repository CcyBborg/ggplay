const axios = require('axios');
const express = require('express');
const { ensureAuthenticated } = require('../middleware');
const Order = require('../models/Order');
const LessonSlot = require('../models/LessonSlot');
const Tournament = require('../models/Tournament');

const router = express.Router();

router.get('/:orderId', ensureAuthenticated, async (req, res) => {
    try {
        const order = await Order.findOne({
            '_id': req.params.orderId
        });

        res.json({
            type: order.type
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/course', ensureAuthenticated, async (req, res) => {
    try {
        if (req.user.course) {
            throw new Error('Course already bought');
        }

        let order = new Order({
            user: req.user._id,
            status: 'placed',
            type: 'course'
        });

        order = await order.save();

        const price = 2600 * 100;

        const response = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
            TerminalKey: process.env.TERMINAL_DEV_KEY,
            Amount: price,
            Description: 'Мастер-класс Dota 2: "Цена времени"',
            OrderId: order._id,
            Receipt: {
                Email: req.user.email || 'ggplay@ggplay.ru',
                EmailCompany: 'ggplay@ggplay.ru',
                Taxation: 'usn_income',
                Items: [{
                    Name: 'Мастер-класс Dota 2: "Цена времени"',
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

router.post('/slot', ensureAuthenticated, async (req, res) => {
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

router.post('/tournament', ensureAuthenticated, async (req, res) => {
    try {
        if (req.body.tournament !== 'dota' && req.body.tournament !== 'cs') {
            throw new Error('Tournament not found');
        }

        let order = new Order({
            user: req.user._id,
            status: 'placed',
            type: 'tournament'
        });

        order = await order.save();

        const tournament = new Tournament({
            user: req.user._id,
            order: order._id,
            type: req.body.tournament
        });

        if (req.body.tournament === 'dota') {
            tournament.info = {
                nickname: req.body.nickname,
                steam: req.body.steam,
                social: req.body.social,
                email: req.body.email,
                rating: req.body.rating,
                roles: req.body.roles
            };
        } else if (req.body.tournament === 'cs') {
            tournament.info = {
                nickname: req.body.nickname,
                steam: req.body.steam,
                social: req.body.social,
                email: req.body.email,
                rating: req.body.rating,
                faceit: req.body.faceit
            };
        }
        await tournament.save();

        const price = 599 * 100;

        const response = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
            TerminalKey: process.env.TERMINAL_DEV_KEY,
            Amount: price,
            Description: 'Взнос за участие в турнире от GGPlay',
            OrderId: order._id,
            Receipt: {
                Email: req.user.email || 'ggplay@ggplay.ru',
                EmailCompany: 'ggplay@ggplay.ru',
                Taxation: 'usn_income',
                Items: [{
                    Name: 'Взнос за участие в турнире от GGPlay',
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

module.exports = router;
