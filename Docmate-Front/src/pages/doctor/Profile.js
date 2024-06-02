import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
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
  // update doc ==========

  //getDoc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="logo">
      <h1>Manage Profile</h1></div>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          // initialValues={{
          //   ...doctor,
          //   // timings: [
          //   //     moment(doctor.timings[0]).format("HH:mm"),
          //   //     moment(doctor.timings[1]).format("HH:mm"),

          //   // //   moment(doctor.timings[0]).format('LT'),
          //   // //   moment(doctor.timings[1]).format('LT'),
            
          // }}
        >
          <h4 className="">Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                initialValue={doctor.firstName}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                initialValue={doctor.lastName}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                initialValue={doctor.phone}
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
                initialValue={doctor.email}
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website" initialValue={doctor.website}>
                <Input type="text" placeholder="Your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                initialValue={doctor.address}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your clinic address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                initialValue={doctor.specialization}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                initialValue={doctor.experience}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                initialValue={doctor.feesPerConsultation}
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your fees per Consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <b>Current Consultation Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="New Consultation Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
          </Row>
          <Row justify="center">
  <Col xs={24} md={24} lg={8}>
    {/* ... your form inputs ... */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Form.Item>
        <button className="btn btn-primary form-btn" type="submit">
          Update Profile
        </button>
      </Form.Item>
    </div>
  </Col>
</Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;