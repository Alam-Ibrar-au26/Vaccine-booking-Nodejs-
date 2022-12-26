const slotDetails = require('../models/slotBookingSchema');
const bookedDetails = require('../models/bookedSlot');
const mongoose = require('mongoose');

class Slot {
  createSlot = async (req, res) => {
    try {
      const { date, slotTime } = req.body;
      if (!date) {
        throw {
          message: 'Please enter a date',
        };
      }
      if (!slotTime) {
        throw {
          message: 'Please enter a start time',
        };
      }

      const response = await slotDetails.create({
        date,
        slotTime,
      });
      res.send({
        status: true,
        response: response,
        message: 'Successfully booked your slot',
      });
    } catch (error) {
      res.send({
        status: false,
        response: error.message,
      });
    }
  };

  getSlots = async (req, res) => {
    try {
      const { userId, date } = req.query;
      let query = {};
      if (userId && date) {
        // const userBookedSlot = await bookedDetails
        //   .find({
        //     userId: userId,
        //     date:new Date(date + 'T00:00:00.000Z').toISOString(),
        //   })
        //   .populate('slotId');
        const userBookedSlot = await bookedDetails.aggregate([
          {
            $lookup: {
              from: 'slots',
              localField: 'slotId',
              foreignField: '_id',
              as: 'slot',
            },
          },
          {
            $match: {
              userId: mongoose.Types.ObjectId(userId),
              'slot.date': new Date(date + 'T00:00:00.000Z').toISOString(),
            },
          },
        ]);
        console.log('userBookedSlot :: ', userBookedSlot);
        if (userBookedSlot.length) {
          res.send({
            status: true,
            message: 'You have already one booking today',
          });
          return;
        }
      }

      let bookedSlots = await bookedDetails.find({}).select('slotId');

      bookedSlots = bookedSlots.map((slots) => slots.slotId);

      if (bookedSlots) {
        query = Object.assign(query, {
          _id: { $nin: bookedSlots },
        });
      }

      if (date) {
        query = Object.assign(query, {
          date: new Date(date + 'T00:00:00.000Z').toISOString(),
        });
      }
      const response = await slotDetails.find(query);
      res.send({
        status: true,
        response: response,
        message: 'Successfully get all slots',
      });
    } catch (error) {
      res.send({
        status: false,
        response: error.message,
      });
    }
  };

  getUserSlots = async (req, res) => {
    const userId = req.query.userId;
    const response = await slotDetails
      .find({ userId: userId })
      .populate('userId');
    res.send(response);
  };

  //   getMedicine = async (req, res) => {
  //     const _id = req.query._id;
  //     const response = await slotDetails.findOne({ _id: _id });
  //     res.send(response);
  //   };

  updateSlot = async (req, res) => {
    const id = req.body.id;
    const slotTime = req.body.slotTime;
    const response = await slotDetails.updateMany(
      { _id: id },
      { slotTime: slotTime }
    );
    res.send(response);
  };
}

module.exports = new Slot();
