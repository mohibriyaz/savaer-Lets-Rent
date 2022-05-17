import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }
  return (
    <div className="login ">
      {loading && <Spinner />}
      <Row className="d-flex align-items-center pt-2">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            data-aos="slide-right"
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
            <h1>Login</h1>
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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

            <button className="btn2 mt-2 mb-3">Login</button>

            <br />

            <Link to="/register"> New to Savaer, Register </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
