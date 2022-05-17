const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./db");
const carsRoute = require("./routes/carRoutes");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const apiRoute = require("./routes/apiRoute");
const paymentRoutes = require("./routes/payment");

const cors = require("cors");

app.use(express.json());
// var corsOptions = {
//   origin: ["http://localhost:3000", "https://checkout.stripe.com"],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(cors());

app.use("/payment", paymentRoutes);

app.use("/api/cars", carsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bookings/", bookingsRoute);
// app.use("/api/payment", apiRoute);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
