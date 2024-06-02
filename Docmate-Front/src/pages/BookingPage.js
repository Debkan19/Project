import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import useRazorpay from "react-razorpay";


const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [Razorpay] = useRazorpay();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // =============== booking function
  const handleBooking = async () => {
    try {
        dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
          fees: doctors.feesPerConsultation,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success && res.data.message==="Payment order created") {
        initPayment(res.data);
      }
      else{
        message.error(res.data.message);
      }
    }
      catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
  };

  const initPayment = (data) => {
		const options = {
			key: data.keyid,
			amount: data.data.amount,
			currency: data.data.currency,
			description: "Payment for Appointment ID "+data.appointmentid,
			order_id: data.data.id,
      "prefill": {
        "name": user.fname+" "+user.lname,
        "email": user.email,
        "contact": user.mobile,
    },
    timeout: 300,
			// handler: async (response) => {
			// 	try {
			// 		const book = await axios.post(
      //       "/api/v1/user/verifing-payment",
      //       {
      //         payment: response,
      //         appointmentid: data.appointmentid,
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem("token")}`,
      //         },
      //       }
      //     );
			// 		if(book.success)
      //     {
      //       console.log(book.data.message);
      //     }
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// },
      "handler": async function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        try {
          		const book = await axios.post(
                "/api/v1/user/verifing-payment",
                {
                  payment: response,
                  appointmentid: data.appointmentid,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
          		if(book.data.success)
              {
                message.success(book.data.message);
              }
              else{
                message.error(book.data.message);
              }
          	} catch (error) {
          		console.log(error);
          	}
    },
			theme: {
				color: "#3399cc",
			},
		};
    console.log(options.description)
    console.log(options.amount)
    console.log("HiRazor")
    var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        message.error(response.error.description+". Your payment failed as "+response.error.reason+", please retry")
});
rzp1.open();
	};

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="logo">
      <h1>Booking Page</h1></div>
      <div className="container m-5">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : Rs {doctors.feesPerConsultation}</h4>
            <h4>
              Timings : {doctors.timings && moment(doctors.timings[0]).format("HH:mm")} -{" "}
              {doctors.timings && moment(doctors.timings[1]).format("HH:mm")}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(value);
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setTime(value);
                }}
              />

              {/* <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button> */}

              <button className="btn btn-primary mt-2 btn-lg" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;