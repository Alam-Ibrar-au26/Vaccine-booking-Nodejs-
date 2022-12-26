const mongoose = require('mongoose');

const booked = new mongoose.Schema({
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'slot' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    status: {
        type: String,
        enum : ['COMPLETED','NOT COMPLETED'],
        default: 'NOT COMPLETED'
    }
});

const bookedDetails = mongoose.model('bookings', booked);

module.exports = bookedDetails;
