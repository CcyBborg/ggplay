const express = require('express');

const Coach = require('../models/Coach');
require('../models/Lesson');

const router = express.Router();

function toUTC(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

router.get('/', async (req, res) => {
    try {
        const filters = {};

        if (req.query.game) {
            filters.game = req.query.game;
        }

        const coaches = await Coach.find(filters)
            .populate('lessons')
            .populate('reviews');

        res.json(coaches.map(coach => {
            const lessons = coach.lessons.sort((l1, l2) => l2.price - l1.price);
            return ({
                _id: coach._id,
                title: coach.title,
                status: coach.status,
                img: coach.img,
                tags: coach.tags,
                price: lessons[0]?.price,

            });
        }));
    } catch (err) {
        console.log(err);
        res.json({ message: err })
    }
});

router.get('/:coachId', async (req, res) => {
    try {
        const coach = await Coach.findOne({ '_id': req.params.coachId })
            .populate({
                path: 'lessons',
                populate: {
                    path: 'slots',
                }
            })
            .populate('reviews')
            .populate('game');

        const now = toUTC(new Date());
        coach.slots = coach.slots?.filter(({timestamp}) => toUTC(new Date(timestamp)) - now - 60 * 1000 > 0);

        res.json(coach);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
})

module.exports = router;
