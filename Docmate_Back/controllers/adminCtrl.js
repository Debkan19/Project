const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");


// GET All Users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({isAdmin: false});
    users.password=undefined;
    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

// GET All Doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting doctors data",
      error,
    });
  }
};

// Change Account Status
const changeAccountStatus =async (req, res) => {
  try{
      const {doctorId, status}=req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status});
      const user = await userModel.findOne({_id:doctor.userId});
      const notification = user.notification;
      notification.push({
        type:'Doctor-Account-Request-Updated',
        message:`Your Doctor Account Request has been ${status}`,
        onClickPath:'/notification'
      });
      if(status==="Approved")
      {
        user.isDoctor = true;
      }
      if(status==="Rejected")
      {
        user.isDoctor = false;
      }
      // user.isDoctor === "approved" ? true : false;
      await user.save()
      res.status(200).send(
        {
          success: true,
          message:`${doctor.firstName}'s account status has been updated`,
          data: doctor,
        }
      );
  }catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while changing the account status",
      error,
    });
  }
}

const changeStatus = async(req, res) => {
  try{
    const userId=req.body.userID;
    const status=req.body.status;
    console.log(userId+" "+status);
      const user = await userModel.findByIdAndUpdate(userId,{status});
      res.status(201).send(
        {
          success: true,
          message:`${user.fname}'s account status has been updated`,
        }
      )
  }catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while changing the account status of users",
      error,
    });
  }
}


module.exports = { getAllDoctorsController, getAllUsersController, changeAccountStatus, changeStatus };