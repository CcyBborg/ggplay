const express = require('express');
const { createChannel } = require('../discord-client');
const LessonSlot = require('../models/LessonSlot');
const { ensureAuthenticated } = require('../middleware');

const router = express.Router();

router.post('/book', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.body.slotId
        });
        // const user = await User.findOne({ '_id': req.userId });
        lessonSlot.user = req.user.id;
        req.user.slots.push(lessonSlot['_id'])
        await lessonSlot.save();
        await req.user.save();

        res.send('Booked');
    } catch (err) {
        res.status(500).send('Nope');
    }
});

router.post('/:slotId/activate', ensureAuthenticated, async (req, res) => {
    try {
        const lessonSlot = await LessonSlot.findOne({
            '_id': req.params.slotId,
            'user': req.userId
        });
        lessonSlot.invite = await createChannel(`${req.user.nickname} ${lessonSlot._id.slice(0, 3)}`);
        await lessonSlot.save();

        res.json({
            invite: lessonSlot.invite
        });
    } catch (err) {
        res.status(500).send('Unexpected error');
    }
});

module.exports = router;
