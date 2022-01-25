const express = require('express');
const axios = require('axios');

const { ensureAuthenticated } = require('../middleware');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

router.get('/count', async (req, res) => {
    try {
        const count = await User.countDocuments({ course: true });
        
        res.json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/order', ensureAuthenticated, async (req, res) => {
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

module.exports = router;
