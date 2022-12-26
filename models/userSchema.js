const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: String,
  phoneNumber: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([0-9]{10}$)/.test(v);
      },
      message: (props) =>
        `${props.value} below/exceeds maximum phone number size is (10)!`,
    },
    required: true,
  },
  age: Number,
  pincode: Number,
  aadhaarNo: {
    type: Number,
    unique: true,
    validate: {
      //regex for validation
      validator: function (v) {
        return /^([0-9]{12}$)/.test(v);
      },
      message: (props) =>
        `${props.value} below/exceeds maximum aadhaar number size is (12)!`,
    },
    required: true,
  },
  password: {
    type: String,
    required: 'Password is required',
  },
});

const userDetails = mongoose.model('user', user);

module.exports = userDetails;
