require("dotenv").config();
const Booking = require("../../models/bookingModel");
const Car = require("../../models/carmodel");

const instance = require("./config");

class RazorpayService {
  async createOrder(req, res) {
    const { amount, itemId } = req.body;
    try {
      const result = await instance.orders.create({
        amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          itemId,
        },
      });
      res.status(200).json({
        ...result,
        key: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error in creating order",
        error: error,
      });
    }
  }
  async saveOrder(req, res) {
    const newbooking = new Booking(req.body);
    const bookingsResp = await newbooking.save();
    console.log(bookingsResp);
    const car = await Car.findOne({ _id: req.body.car });
    console.log(req.body.car);
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);

    await car.save();
    res.send("Your Booking is successfull");
  }
}

module.exports = new RazorpayService();
