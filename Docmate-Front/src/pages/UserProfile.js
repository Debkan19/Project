import React, { useEffect, useState } from "react";
import Layout from "././../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from ".././redux/features/alertSlice";
import moment from "moment";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
//   const [doctor, setDoctor] = useState(null);
 const [userDetails, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const params = useParams();
  // update user ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/updateUserProfile",
        {
          ...values,
          userId: user._id,
        //   timings: [
        //     moment(values.timings[0]).format('LT'),
        //     moment(values.timings[1]).format('LT'),
        //   ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/dashboard");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong ");
    }
  };
  // update user ==========

  //getUser Details
  const getUserInfo = async () => {
    try {
        console.log("Hi: "+user._id);
      const res = await axios.post(
        "/api/v1/user/getUserInfo",{userId: user._id},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="logo"><h1>Manage Profile</h1></div>
      {userDetails && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
        >
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="fname"
                required
                initialValue={userDetails.fname}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lname"
                required
                initialValue={userDetails.lname}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No:"
                name="mobile"
                required
                initialValue={userDetails.mobile}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your contact No." />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                initialValue={userDetails.email}
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your email address" />
              </Form.Item>
            </Col>
            </Row>
            <Row justify="center">
            <Col xs={24} md={24} lg={8}>
            {/* ... your form inputs ... */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn btn-primary form-btn" type="submit">
            Update Profile
            </button>
            </div>
            </Col>
            </Row>
        </Form>
      )}
    </Layout>
  );
};

export default UserProfile;