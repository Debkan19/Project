const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const startTime = moment(doctor.timings[0]).format("HH:mm");
    const endTime = moment(doctor.timings[1]).format("HH:mm");
    doctor.timings[0]=startTime;
    doctor.timings[1]=endTime;
    // var isoDate = doctor.timings[0];
    // // console.log(new Date(isoDate));
    // console.log("Hi "+moment(isoDate).format('HH:mm'));
    res.status(200).send({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching doctor details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    req.body.fname = req.body.firstName;
    req.body.lname = req.body.lastName;
    req.body.mobile = req.body.phone;
    console.log(req.body);
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    if(user)
    {
      console.log("Updated");
    }
    else{
      console.log("Not Updated");
    }
    res.status(201).send({
      success: true,
      message: "Doctor profile updated successfully",
      // data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updaing doctor profile",
      error,
    });
  }
};

//get doc details by docId
const getDoctorByIdController = async (req, res) => {
    try{
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      data: doctor,
    });
    }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while fetching doctor details",
          error,
        });
      }
}


//Get appointment list for doctors
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
      paymentStatus: "Paid",
    });
    console.log(req.body.userId);
    console.log(doctor._id);
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doctor Appointments",
    });
  }
};

//Update the status of Appointment
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `Your appointment has been ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController, updateStatusController, doctorAppointmentsController };