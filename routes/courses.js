const express = require('express');
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

module.exports = router;
