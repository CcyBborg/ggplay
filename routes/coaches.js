const express = require('express');

const Coach = require('../models/Coach');
const User = require('../models/User');
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
                about: coach.about.slice(0, 100) + '...',
                price: lessons[lessons.length - 1]?.price,
                rating: coach.reviews.reduce((acc, cur) => acc + Number(cur?.rating), 0) / coach.reviews.length,
                reviewsLength: coach.reviews.length
            });
        }).sort((c1, c2) => c2.rating - c1.rating));
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
            .populate({
                path: 'reviews',
                populate: {
                    path: 'slot',
                }
            })
            .populate('game')
            .sort([['order', 'ascending']]);

        const response = {
            _id: coach._id,
            title: coach.title,
            status: coach.status,
            img: coach.img,
            tags: coach.tags,
            game: coach.game,
            about: coach.about,
            reviews: coach.reviews,
            lessons: coach.lessons,
            rating: coach.reviews.reduce((acc, cur) => acc + Number(cur?.rating), 0) / coach.reviews.length
        };

        for (let i = 0; i < response.reviews.length; i++) {
            const review = response.reviews[i];
            const user = await User.findOne({ _id:review.slot.user });

            response.reviews[i] = {
                _id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: {
                    profile: user.profile,
                    nickname: user.nickname
                }
            };
        }
        
        return res.json(response);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
