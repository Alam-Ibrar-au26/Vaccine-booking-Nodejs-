const mongoose = require('mongoose');

const slot = new mongoose.Schema({
  date: { type: Date ,required: true},
  slotTime: { type: String, required: true },
});

const slotDetails = mongoose.model('slot', slot);

module.exports = slotDetails;
