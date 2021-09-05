const express = require('express');
const { ensureAuthenticated } = require('../middleware');
const passport = require('passport');
const User = require('../models/User');
const LessonSlot = require('../models/LessonSlot');

const router = express.Router();

function toUTC(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

const NOTIF_PERIOD = 60 * 60 * 1000; // One Hour

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
    try {
        const slots = await LessonSlot.find({ user: req.user._id }).populate('lesson');

        const now = toUTC(new Date());
        const notifications = slots?.map(slot => {
            const slotDate = toUTC(new Date(slot.timestamp));
            if (Math.abs(slotDate - now) < NOTIF_PERIOD) {
                return {
                    _id: slot._id,
                    lesson: slot.lesson,
                    timestamp: slot.timestamp,
                    invite: slot.invite
                };
            }
        });

        res.json({
            id: req.user.id,
            nickname: req.user.nickname,
            email: req.user.email,
            profile: req.user.profile,
            notifications
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.send('Success!');
});

module.exports = router;
