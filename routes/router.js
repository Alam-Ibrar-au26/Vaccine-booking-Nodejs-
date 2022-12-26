const router = require('express').Router();
const Register = require('../controller/registerController.js');
const Login = require('../controller/loginController');
const Slot = require('../controller/slotController');
const Booked = require('../controller/bookedController');

// #Slot
router.post('/booking', Slot.createSlot);
router.get('/bookings', Slot.getSlots);

// #BookedSlots
router.post('/created-booked', Booked.createBooked);
router.get('/booked-slots', Booked.getBooked);
router.put('/update-slot', Slot.updateSlot);

// #User_Register
router.post('/register', Register.signUp);

// #User_Login
router.get('/login', Login.signIn);
router.get('/users', Login.getUsers);
router.get('/user-slot', Slot.getUserSlots);
router.put('/update-user', Login.updateUser);

module.exports = router;
