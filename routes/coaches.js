const express = require('express');

const Coach = require('../models/Coach');
require('../models/Lesson');

const router = express.Router();

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

        res.json(coach);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;
