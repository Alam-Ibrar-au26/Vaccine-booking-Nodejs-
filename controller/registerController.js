const { response } = require('express');
const userDetails = require('../models/userSchema');
const bcrypt = require('bcrypt');

class Register {
  signUp = async (req, res) => {
    try {
      const { name, phoneNumber, age, pincode, aadhaarNo, password } = req.body;
      if (!name) {
        throw {
          message: 'Please enter your name',
        };
      }
      if (!phoneNumber) {
        throw {
          message: 'Please enter your phone number',
        };
      }
      if (!age) {
        throw {
          message: 'Please enter your age',
        };
      }
      if (!pincode) {
        throw {
          message: 'Please enter your area pincode',
        };
      }
      if (!aadhaarNo) {
        throw {
          message: 'Please enter your aadhaar number',
        };
      }
      if (!password) {
        throw {
          message: 'Please create your password',
        };
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const response = await userDetails.create({
        name,
        phoneNumber,
        age,
        pincode,
        aadhaarNo,
        password: passwordHash,
      });
      res.send({
        status: true,
        response: {
          name: response.name,
          phoneNumber: response.phoneNumber,
          age: response.age,
          pincode: response.pincode,
          aadhaarNo: response.aadhaarNo,
          id: response._id,
        },
        message: 'Successfully Register!!',
      });
    } catch (error) {
      res.send({
        status: false,
        response: error.message,
      });
    }
  };
}

module.exports = new Register();
