const express = require('express');

const { ensureAuthenticated } = require('../middleware');
const CSTournament = require('../models/CSTournament');
const DotaTournament = require('../models/DotaTournament');

const router = express.Router();

router.post('/dota', ensureAuthenticated, async (req, res) => {
    try {
        if (!(req.user.course || req.user.slots.length)) {
            throw new Error('User is not valid for tournament');
        }

        const tournament = new DotaTournament({
            user: req.user._id,
            nickname: req.body.nickname,
            steam: req.body.steam,
            social: req.body.social,
            email: req.body.email,
            rating: req.body.rating,
            roles: req.body.roles
        });

        await tournament.save();

        req.user.tournaments.push('dota');

        await req.user.save();

        res.send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

router.post('/cs', ensureAuthenticated, async (req, res) => {
    try {
        if (!(req.user.course || req.user.slots.length)) {
            throw new Error('User is not valid for tournament');
        }

        const tournament = new CSTournament({
            user: req.user._id,
            nickname: req.body.nickname,
            steam: req.body.steam,
            social: req.body.social,
            email: req.body.email,
            rating: req.body.rating,
            faceit: req.body.faceit
        });

        await tournament.save();

        req.user.tournaments.push('cs');

        await req.user.save();

        res.send('Ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Произошла ошибка. Попробуйте позже.'
        });
    }
});

module.exports = router;
