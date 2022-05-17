import React, { useState, useEffect, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { Row, Col, Divider, DatePicker, Checkbox, Button } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import { bookCar, bookError } from "../redux/actions/bookingActions";
import Modal from "antd/lib/modal/Modal";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import useRazorpay from "../hooks/useRazorpay";
import { createOrder } from "../http/http";
import { makePayment } from "../services/RazorpayService";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker;

function Bookingcar({ match }) {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState();
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const RpayHook = useRazorpay();

  const onPaymentSuccess = (response) => {
    const reqObj = {
      transactionid: response.razorpay_payment_id,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    console.log(reqObj);
    dispatch(bookCar(reqObj));
  };
  const onPaymentFailure = (errResponse) => {
    console.log(errResponse);
    dispatch(bookError(errResponse));
  };

  const onDismiss = () => {
    dispatch(bookError());
  };

  const handlePayment = async () => {
    dispatch({ type: "LOADING", payload: true });

    const order = await createOrder({
      amount: totalAmount * 100,
      itemId: "item_id",
    });
    makePayment(order, onPaymentSuccess, onPaymentFailure, onDismiss);
  };

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour + (driver && totalHours * 30));
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            className="carimg2 bs1 w-100 "
            data-aos="flip-left"
            data-aos-duration="1700"
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" Dashed>
            Ride Details
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel : {car.fuelType}</p>
            <p>Max. Persons : {car.capacity}</p>
          </div>
          <Divider type="horizontal" Dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>

          {from && to && (
            <div style={{ textAlign: "right" }}>
              <p>
                Total Hours: <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour: <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3> Total Amount: {totalAmount}</h3>
              <button onClick={handlePayment} className="btn5">
                {" "}
                Pay and Book{" "}
              </button>
            </div>
          )}
        </Col>{" "}
        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}
              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default Bookingcar;
