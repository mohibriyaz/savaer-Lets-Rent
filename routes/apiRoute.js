const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Kg3x4SBI7FG1HtfJI0PAqUBZiEYWyOozYJ13xRv39wapX3Nwq7s5g2fcL1oEEB6xNIIiCHmL3KBq85DOczEFMXz00X9Gp2u1y"
);
const router = express.Router();

router.post("", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.redirect(303, session.url);
});
module.exports = router;
