const express = require('express');
const { Client, Intents } = require('discord.js');
const passport = require('passport');
const User = require('../models/User');
const LessonSlot = require('../models/LessonSlot');

const router = express.Router();

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.sendStatus(401);

// Local auth
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(409).json({
                error: 'Пользователь с такой почтой уже зарегистрирован. Попробуйте войти.'
            });
        } else {
            const newUser = new User({
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                profile: {
                    game: req.body.game,
                    rank: req.body.rank
                }
            });

            await newUser.save();
            res.send('Signed Up');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: 'Произошла ошибка. Попробуйте позже.'
            });
        }
        if (!user) {
            res.status(401).json({
                error: 'Неверное имя пользователя или пароль.'
            });
        } else {
            req.logIn(user, err => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: 'Произошла ошибка. Попробуйте позже.'
                    });
                }
                res.send('Logged In');
            });
        }
    })(req, res, next);
});

// Google oauth
router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'profile',
        'email'
    ]
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/sign-up'
}));

// Vkontakte oauth
router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/sign-up'
}));

// Discord oauth
router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/sign-up'
}));

// Authorized user's info
router.get('/info', ensureAuthenticated, async (req, res) => {
    res.json({
        id: req.user.id,
        nickname: req.user.nickname,
        email: req.user.email,
        profile: req.user.profile
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.send('Success!');
});

router.post('/book-slot', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.body.slotId
        });
        const user = await User.findOne({ '_id': req.userId });
        lessonSlot.user = req.userId;
        user.slots.push(lessonSlot['_id'])
        await lessonSlot.save();
        await user.save();

        res.send('Booked');
    } catch (err) {
        res.status(500).send('Nope');
    }
});

module.exports = router;
