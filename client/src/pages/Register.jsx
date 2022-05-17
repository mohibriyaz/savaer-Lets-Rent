import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userRegister(values));
    console.log(values);
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://rexluxurycarrental.com/wp-content/uploads/2019/01/range-rover-sport-5-768x510.jpg"
            alt="savaer"
          ></img>
          <h1 className="login-logo">SAVAER.com</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />

            <Form.Item
              name="username"
              label="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                style={{
                  background: "#333333",
                  border: "none",
                  color: "white",
                  opacity: " 0.5",
                }}
              />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="confirm password"
              rules={[{ required: true }]}
            >
              <Input.Password
                style={{
                  background: "#333333",
                  border: "none",
                  color: "white",
                  opacity: " 0.5",
                }}
              />
            </Form.Item>

            <button className="btn2 mt-2 mb-3">Register</button>

            <br />

            <Link to="/login"> Already a member, Login in </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
