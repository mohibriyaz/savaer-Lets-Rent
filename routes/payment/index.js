var express = require("express");
const razorpayService = require("../../services/razorpayService/razorpayService");
const router = express.Router();

router.post("/create-order", razorpayService.createOrder);
router.post("/save-order", razorpayService.saveOrder);

module.exports = router;
