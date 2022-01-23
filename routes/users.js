const express = require('express');
const { ensureAuthenticated, persistGame } = require('../middleware');
const passport = require('passport');
const User = require('../models/User');
const LessonSlot = require('../models/LessonSlot');

const router = express.Router();

function toUTC(date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

const NOTIF_PERIOD = 20 * 60 * 1000; // 20 minutes

const processGameSession = async (req, res) => {
    if (req.session?.game) {
        req.user.profile = {
            ...req.user.profile,
            game: req.session.game
        };
    }

    await req.user.save();

    res.redirect('/coaching');
};

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
                    game: req.body.game
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

// Vkontakte oauth
router.get('/auth/vkontakte', persistGame, passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
    failureRedirect: '/sign-up'
}), processGameSession);

// Yandex oauth
router.get('/auth/yandex', persistGame, passport.authenticate('yandex'));

router.get('/auth/yandex/callback', passport.authenticate('yandex', {
    failureRedirect: '/sign-up'
}), processGameSession);

// Google oauth
router.get('/auth/google', persistGame, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-up'
}), processGameSession);

// Discord oauth
router.get('/auth/discord', persistGame, passport.authenticate('discord'));

router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/sign-up'
}), processGameSession);

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

            const isPast = now - slotTime > NOTIF_PERIOD;
            if (!isPast) {
                present.push(slot);
            }

            return isPast;
        });

        res.json({
            id: req.user._id,
            nickname: req.user.nickname,
            email: req.user.email,
            profile: req.user.profile,
            course: req.user.course,
            slots: {
                present,
                past
            },
            tournaments: req.user.tournaments
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/edit', ensureAuthenticated, async (req, res) => {
    req.user.profile = {
        ...req.user.profile,
        game: req.body.game
    };

    await req.user.save();

    res.redirect('/coaching');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.send('Success!');
});

module.exports = router;
