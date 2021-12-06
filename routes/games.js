const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await Game.find().sort('order');
        res.json(games);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
