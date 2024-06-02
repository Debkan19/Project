import React, {useEffect, useState} from 'react';
import "../styles/LayoutStyles.css"
import axios from 'axios';
import Layout from './../components/Layout';
import { message, Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
const [doctors, setDoctors] = useState([])
//login user data
const getUserData = async() =>{
  try{
    const res = await axios.get('/api/v1/user/getAllDoctors',{
      headers:{
        Authorization : "Bearer "+localStorage.getItem("token"),
      },
    });
    if(res.data.success)
    setDoctors(res.data.data)
  else
  message.error(res.data.message)
  }
  catch(error)
  {
    console.log(error)
  }
}

useEffect(() => {
  getUserData()
}, [])
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  )
}

export default HomePage