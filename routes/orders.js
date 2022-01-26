const express = require('express');
const { ensureAuthenticated } = require('../middleware');
const Order = require('../models/Order');

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

module.exports = router;
