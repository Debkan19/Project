import React from "react";
import "../styles/RegisterStyles.css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  // const sendOTP = (email) => {
  //   console.log(email);
  // }

  // const sendOTP = async (useremail) => {
  //   try {
  //     const res = await axios.post(
  //       "/api/v1/doctor/update-status",
  //       { appointmentsId: record._id, status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       message.success(res.data.message);
  //       getAppointments();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error("Something went wrong");
  //   }
  // };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register with us</h3>
          <Form.Item label="First Name" name="fname">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Last Name" name="lname">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          {/* <button className="btn btn-info" >
            Send OTP
            </button>
          <Form.Item label="OTP" name="otp">
            <Input type="text" required disabled/>
          </Form.Item> */}
          <Form.Item label="Mobile No." name="mobile">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user? login here
          </Link>
          <button className="btn btn-primary btn-lg" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;