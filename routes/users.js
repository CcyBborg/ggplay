const express = require('express');
const { ensureAuthenticated, persistGameRank } = require('../middleware');
const passport = require('passport');
const User = require('../models/User');
const LessonSlot = require('../models/LessonSlot');

const router = express.Router();

function toUTC(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

const NOTIF_PERIOD = 20 * 60 * 1000; // One Hour

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
    successRedirect: '/coaching',
    failureRedirect: '/sign-up'
}));

// Vkontakte oauth
router.get('/auth/vkontakte', persistGameRank, passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    successRedirect: '/coaching',
    failureRedirect: '/sign-up'
}), (req, res) => {
    if (req.user) {
        const game = req.session.game;
        const rank = req.session.rank;

        req.user.game = game;
        if (rank) {
            req.user.rank = rank;
        }

        req.user.save();
    }
});

// Discord oauth
router.get('/auth/discord', passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    successRedirect: '/coaching',
    failureRedirect: '/sign-up'
}));

// Authorized user's info
router.get('/info', ensureAuthenticated, async (req, res) => {
    try {
        const slots = await LessonSlot.find({ user: req.user._id })
            .populate('lesson')
            .populate('review')
            .populate({
                path: 'lesson',
                populate: {
                    path: 'coach',
                }
            });;

        slots.sort((slotA, slotB) => {
            const slotATime = toUTC(new Date(slotA.timestamp));
            const slotBTime = toUTC(new Date(slotB.timestamp));

            if (slotATime > slotBTime) {
                return -1;
            } else if (slotATime < slotBTime) {
                return 1;
            } else {
                return 0;
            }
        });

        const now = toUTC(new Date());
        let notification = slots?.find(
            ({ timestamp }) => Math.abs(toUTC(new Date(timestamp)) - now) < NOTIF_PERIOD
        );

        if (notification) {
            notification = {
                _id: notification._id,
                type: 'SOON',
                lesson: notification.lesson,
                timestamp: notification.timestamp,
                invite: notification.invite,
                channel: notification.channel
            };
        } else {
            notification = slots?.find(({ timestamp, lesson, review }) => {
                const slotTime = toUTC(new Date(timestamp));

                return !review && (slotTime < now && now - slotTime > lesson.duration * 1000);
            });

            if (notification) {
                notification = {
                    _id: notification._id,
                    type: 'REVIEW',
                    lesson: notification.lesson,
                    timestamp: notification.timestamp
                };
            }
        }

        res.json({
            id: req.user.id,
            nickname: req.user.nickname,
            email: req.user.email,
            profile: req.user.profile,
            notification
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.get('/slots', ensureAuthenticated, async (req, res) => {
    try {
        const slots = await LessonSlot.find({ user: req.user._id })
            .populate('lesson')
            .populate('review')
            .populate({
                path: 'lesson',
                populate: {
                    path: 'coach',
                }
            });

        slots.sort((slotA, slotB) => {
            const slotATime = toUTC(new Date(slotA.timestamp));
            const slotBTime = toUTC(new Date(slotB.timestamp));

            if (slotATime > slotBTime) {
                return -1;
            } else if (slotATime < slotBTime) {
                return 1;
            } else {
                return 0;
            }
        });

        const now = toUTC(new Date());
        const present = [];
        const past = slots.filter(slot => {
            const slotTime = toUTC(new Date(slot.timestamp));

            const isPast = now - slotTime < now - 20 * 1000;
            if (!isPast) {
                present.push(slot);
            }

            return isPast;
        });

        res.json({
            past,
            present
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
