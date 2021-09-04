const mongoose = require('mongoose');

const RankSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games'
    }
});

module.exports = mongoose.model('Ranks', RankSchema)
