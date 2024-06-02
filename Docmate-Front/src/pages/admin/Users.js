import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

   //Handle Account Status Change
   const handleStatus = async (record, newstatus) => {
    try {
      console.log(record._id);
      const res = await axios.post(
        "/api/v1/admin/changeUserAccountStatus",
        { userID: record._id, status: newstatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" ? (
            <button className="btn btn-danger btn-lg" onClick={()=>handleStatus(record, "Blocked")}>Block</button>
          ) : (
            <button className="btn btn-success btn-lg" onClick={()=>handleStatus(record, "Pending")}>Unblock</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;