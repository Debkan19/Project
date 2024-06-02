import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "Name",
      render: (text, record) => <span>{record.userDetails[0]+" "+record.userDetails[1]}</span>,
    },
    {
      title: "Patient Mobile No:",
      dataIndex: "mobile",
      render: (text, record) => <span>{record.userDetails[2]}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
        title: "Time",
        dataIndex: "time",
      },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success btn-lg"
                onClick={() => handleStatus(record, "Approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2 btn-lg"
                onClick={() => handleStatus(record, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="logo">
      <h1>List of Appointments</h1></div>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;