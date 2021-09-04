const express = require('express');
const Game = require('../models/Game');
const Rank = require('../models/Rank');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const games = await Game.find().sort('order');
        res.json(games);
    } catch (err) {
        res.json({ message: err })
    }
});

router.get('/:gameId/ranks', async (req, res) => {
    try {
        const ranks = await Rank.find({ game: req.params.gameId })
        res.json(ranks);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;
