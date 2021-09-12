const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/notify', async (req, res) => {
    try {
        console.log('\n\n\n\n\n');
        console.log(req.body);
        console.log('\n\n\n\n\n');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
