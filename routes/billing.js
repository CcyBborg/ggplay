const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const LessonSlot = require('../models/LessonSlot');
const { createChannel } = require('../discord-client');
const crypto = require('crypto');
const router = express.Router();
 
router.post('/notify', async (req, res) => {
    try {
        if (req.body.Status === 'REJECTED') {
            const order = await Order.findOne({ _id: req.body.OrderId });

            order.status = 'rejected';
            await order.save();
            res.send('OK');
        } else {
            if (req.body.Success) {
                if (req.body.Status === 'CONFIRMED') {
                    const order = await Order.findOne({ _id: req.body.OrderId });
                    const user = await User.findOne({ _id: order.user });
                    const slot = await LessonSlot.findOne({ _id: order.slot }).populate('lesson');

                    user.slots.push(slot._id)
                    slot.user = user._id;

                    slot.channel = `${user.nickname}-${String(slot._id).slice(0, 4)}`;
                    slot.invite = await createChannel(slot.channel, slot.lesson.maxParticipants);

                    await slot.save();
                    await user.save();

                    order.status = 'confirmed';
                    await order.save();
                }

                res.send('OK');
            } else {
                const order = Order.findOne({ _id: req.body.OrderId });

                if (order) {
                    order.status = 'failed';
                }

                await order.save();

                res.send('ERROR');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
