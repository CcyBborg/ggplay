const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const LessonSlot = require('./models/LessonSlot');
const Coach = require('./models/Coach');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    async () => {
        // const lesson = await Lesson.findOne({ _id: '614743af5e84796b4ce54444' });
        const dates = [[
            '20'
        ]];
        const month = ['09'];
        const time = '16:30';

        const coaches = await Coach.find({}).populate('lessons');
        for (const c of coaches) {
            const lesson = c.lessons[0]

            const timestamp = `2021-09-20T16:30:00.123Z`;
            let slot = LessonSlot.find({
                timestamp,
                lesson: lesson._id
            });
            await slot.remove();
            return;

            try {
                slot = await slot.save();

                lesson.slots.push(slot._id);
                await lesson.save();
            } catch(err) {
                console.log(err);
                return;
            }
        }

        return;

        for (let i = 0; i < dates.length; i++) {
            for (let j = 0; j < dates[i].length; j++) {
                const timestamp = `2021-${month[i]}-${dates[i][j]}T${time}:00.123Z`;
                // const slot = await LessonSlot.find({ timestamp, lesson: lesson._id });
                // for (const s of slot) {
                //     await s.remove();
                // }

               // await slot[0].remove();
                let slot = new LessonSlot({
                    timestamp,
                    lesson: lesson._id
                });

                try {
                    slot = await slot.save();

                    lesson.slots.push(slot._id);
                    await lesson.save();
                } catch(err) {
                    console.log(err);
                    return;
                }
            }
        }
    }
);
