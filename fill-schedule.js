const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const LessonSlot = require('./models/LessonSlot');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    async () => {
        const lesson = await Lesson.findOne({ _id: '614890268e2c4a7ad5a9ccb0' });
        const dates = [[
            '21', '22', '24', '26', '29', '30'
        ], [
            '02', '03', '04', '07', '08', '09', '10',
            '11', '29', '30', '31'
        ]];
        const month = ['09', '10'];
        const time = '20:30'; //13:30 18:30, 19:30, 14:30

        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
                const timestamp = `2021-09-21T10:35:00.123Z`;
            //  const slot = await LessonSlot.find({ timestamp, lesson: lesson._id });
            //     for (const s of slot) {
            //         await s.remove();
            //     }

            //    await slot[0].remove();
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
