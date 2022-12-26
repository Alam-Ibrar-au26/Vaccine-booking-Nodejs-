const bookedDetails = require('../models/bookedSlot');

class Booked {
  createBooked = async (req, res) => {
    try {
      const { slotId, userId } = req.body;
      if (!slotId) {
        throw {
          message: 'Please enter your slotId',
        };
      }
      if (!userId) {
        throw {
          message: 'Please enter your userId',
        };
      }
      const bookedList = await bookedDetails.find({
        userId: userId,
        status: 'COMPLETED',
      });
      if (bookedList.length >= 2) {
        throw {
          message: 'You are fully vaccinated',
        };
      }

      const response = await bookedDetails.create({
        slotId,
        userId,
      });
      res.send({
        status: true,
        response: response,
        message: 'Successfully booked',
      });
    } catch (error) {
      res.send({
        status: false,
        response: error.message,
      });
    }
  };

  getBooked = async (req, res) => {
    try {
      const response = await bookedDetails.find().populate('userId slotId');
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

  updateBooked = async (req, res) => {
    const id = req.body.id;
    const slotTime = req.body.slotTime;
    const response = await bookedDetails.updateOne({ _id: id }, { slotTime: slotTime });
    res.send(response);
  };
}

module.exports = new Booked();
