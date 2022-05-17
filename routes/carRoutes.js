const express = require("express");
const router = express.Router();
const car = require("../models/carmodel");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new car(req.body);
    await newcar.save();
    res.send("Vehicle added Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const _car = await car.findOne({ _id: req.body._id });
    _car.name = req.body.name;
    _car.image = req.body.image;
    _car.fuelType = req.body.fuelType;
    _car.rentPerHour = req.body.rentPerHour;
    _car.capacity = req.body.capacity;

    await _car.save();

    res.send("Details Updated Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car Deleted Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
