const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonSlots',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema)
