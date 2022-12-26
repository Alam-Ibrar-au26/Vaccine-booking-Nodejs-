const { response } = require('express');
const userDetails = require('../models/userSchema');
const bcrypt = require('bcrypt');

class Login {
  signIn = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      if (!phoneNumber) {
        throw { message: 'Phone number is required' };
      }
      if (!password) {
        throw { message: 'Password is required' };
      }
      const findCredentials = await userDetails.find({ phoneNumber });
      if (findCredentials.length == 0) {
        throw { message: 'signUp is Required' };
      }
      if (bcrypt.compareSync(password, findCredentials[0].password)) {
        return res.status(202).send({
          message: 'LogIn Successfully',
          error: false,
          data: {
            id: findCredentials[0]._id,
            name: findCredentials[0].name,
            phoneNumber: findCredentials[0].phoneNumber,
            age: findCredentials[0].age,
            pincode: findCredentials[0].pincode,
            aadhaarNo: findCredentials[0].aadhaarNo,
          },
        });
      } else {
        throw { message: 'Password is wrong!' };
      }
    } catch (error) {
      res.send({
        status: false,
        response: error.message,
      });
    }
  };

  getUserSlots = async (req, res) => {
    const userId = req.query.userId;
    const response = await userDetails
      .find({ userId: userId })
      .populate('userId');
    res.send(response);
  };

  getUsers = async (req, res) => {
    const response = await userDetails
      .find({ _id: { $nin: ['639181d7983b1670f3feaaab'] } })
      .populate();
    res.send(response);
  };

  getUser = async (req, res) => {
    const userId = req.query.userId;
    const response = await userDetails
      .findOne({ userId: userId })
      .populate('userId');
    res.send(response);
  };

  updateUser = async (req, res) => {
    const id = req.body.id;
    const response = await userDetails.updateMany({ _id: id });
    res.send(response);
  };
}

module.exports = new Login();
