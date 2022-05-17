import axios from "axios";
import { message } from "antd";
import { saveOrder } from "../../http/http";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await saveOrder(reqObj);
    dispatch({ type: "LOADING", payload: false });

    message.success("Your Car Booked Successfully");
    setTimeout(() => {
      window.location.href = "/userbookings";
    }, 500);
  } catch (error) {
    dispatch({ type: "LOADING", payload: false });
    message.error("Oops! Something went wrong, Please try after sometime");
  }
};

export const bookError = () => (dispatch) => {
  dispatch({ type: "LOADING", payload: false });
  message.error("Oops! Something went wrong, Please try after sometime");
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
