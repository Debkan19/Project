const userModels = require('../models/userModels');
const bcrypt = require('bcryptjs');
//123456
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
var nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require("dotenv");
const PDFDocument = require('pdfkit');
const fs = require('fs');
// import PDFDocument from 'pdfkit';
// import fs from 'fs';

const registerController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(200).send({ success: false, message: `Please login as you are already registered` })
    }
    else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPassword
      const newUser = new userModels(req.body)
      await newUser.save()

      //Send confirmation email

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDER_GMAIL,
          pass: process.env.SENDER_GMAIL_PASSCODE,
        }
      });

      var mailOptions = {
        from: process.env.SENDER_GMAIL,
        to: req.body.email,
        subject: 'Registration successful',
        text: `Hi ${req.body.fname} ${req.body.lname},
          Welcome to docMate, your one-stop point to connect with doctors. We hope you a very good health.
          
Thank You,
Team docMate`,
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      //Email code

      res.status(201).send({ success: true, message: `You are successfully Registered` })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register controller ${error.message}` })
  }
}



const loginController = async (req, res) => {
  try {
    const existingUser = await userModels.findOne({ email: req.body.email })
    if (existingUser) {
      const accountstatus = await userModels.findOne({ status: "Blocked", email: req.body.email })
      if (accountstatus) {
        return res.status(200).send({ success: false, message: `Your account is blocked, contact admin` })
      }
      else {
        const isMatch = await bcrypt.compare(req.body.password, existingUser.password)
        if (isMatch) {
          const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
          res.status(201).send({ success: true, message: `Logged In `, token })
        }
        else {
          return res.status(200).send({ success: false, message: `Wrong password entered` })
        }
      }

    }
    else {
      return res.status(200).send({ success: false, message: `Please Register` })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Login controller ${error.message}` })
  }
}

const authController = async (req, res) => {
  try {
    const user = await userModels.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send(
        {
          message: `User not found`,
          success: false
        }
      )
    }
    else {
      user.password = undefined;
      res.status(200).send(
        {
          success: true,
          data: user,
        }
      )
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Authorization Controller failed`,
      error
    })
  }
}
//Apply for Doctor Account
const applyDoctorController = async (req, res) => {
  try {
    const repeatedRequest = await doctorModel.findOne({ userId: req.body.userId })
    if (!repeatedRequest) {
      // req.body.timings[0] = moment(req.body.time, "HH:mm").toISOString();
      // req.body.timings[1] = moment(req.body.time, "HH:mm").toISOString();
      const user = await userModel.findOne({ _id: req.body.userId })
      const newDoctor = await doctorModel({ ...req.body, status: 'Pending' })
      newDoctor.firstName = user.fname
      newDoctor.lastName = user.lname
      newDoctor.phone = user.mobile
      newDoctor.email = user.email
      await newDoctor.save()
      const adminUser = await userModel.findOne({ isAdmin: true })
      const notification = adminUser.notification
      notification.push({
        type: 'apply-doctor-request',
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied to be a Doctor User`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: '/admin/Doctors'
        }
      })
      await userModel.findByIdAndUpdate(adminUser._id, { notification })
      res.status(201).send({
        success: true,
        message: `Doctor Account Appiled Successfully`
      })
    }
    else {
      res.status(200).send({
        success: false,
        message: `You already applied as a Doctor`,
      })
    }


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Error while applying for Doctor user`,
      error
    })
  }
}
//Get All Notifications Ctrl
const getAllNoticationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId })
    const seennotification = user.seennotification
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = seennotification
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({
      success: true,
      message: `All Notifications are marked as read`,
      data: updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Failed to get notifications`,
      error
    })
  }
}

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId })
    user.seennotification = []
    user.notification = []
    const updatedUser = await user.save()
    updatedUser.password = undefined
    res.status(200).send({
      success: true,
      message: `All notifications are deleted`,
      data: updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: `Failed to delete all notifications`,
      error
    })
  }
}

//GET ALL DOC
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "Approved" });
    res.status(200).send({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching list of Doctors",
    });
  }
};


//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  try {
    //const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const time = req.body.time;
    const date = req.body.date;
    const currentDate = new Date();
    const currentISODate = moment(currentDate).toISOString();
    const doctorId = req.body.doctorId;
    const docTiming = await doctorModel.findOne({ _id: doctorId });
    if (date < currentISODate && moment(date).format("DD-MM-YYYY") != moment(currentISODate).format("DD-MM-YYYY")) {
      return res.status(200).send({
        message: "Booking Date cannot be scheduled in past",
        success: false,
      });
    }
    else if (moment(date).format("DD-MM-YYYY") == moment(currentISODate).format("DD-MM-YYYY") && time < currentISODate && moment(time).format("HH:mm") != moment(currentISODate).format("HH:mm")) {
      return res.status(200).send({
        message: "Booking Time cannot be scheduled in past",
        success: false,
      });
    }
    else {
      if (moment(time).format("HH:mm") > moment(docTiming.timings[0]).format("HH:mm") && moment(time).format("HH:mm") < moment(docTiming.timings[1]).format("HH:mm")) {
        //Booking unpaid appointment
        req.body.date = moment(req.body.date).format("DD-MM-YYYY");
        req.body.time = moment(req.body.time).format("HH:mm");
        req.body.status = "Pending";
        const newAppointment = new appointmentModel(req.body);
        const patient = await userModel.findOne({ _id: req.body.userId });
        newAppointment.userDetails[0] = patient.fname;
        newAppointment.userDetails[1] = patient.lname;
        newAppointment.userDetails[2] = patient.mobile;
        newAppointment.userDetails[3] = patient.email;
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        newAppointment.docDetails[0] = user.fname;
        newAppointment.docDetails[1] = user.lname;
        newAppointment.docDetails[2] = user.mobile;
        newAppointment.docDetails[3] = user.email;
        newAppointment.paymentId = "nil";
        newAppointment.razorpayOrderId = "nil";
        // newAppointment.docDetails[4] = user.feesPerConsultation;
        // newAppointment.docDetails[5] = user.specialization;
        await newAppointment.save();
        const newEntry = await appointmentModel.findOne().sort({ _id: -1 }).limit(1);
        // user.notification.push({
        //   type: "New-appointment-request",
        //   message: `A new Appointment Request from ${req.body.userInfo.fname} ${req.body.userInfo.lname} has been generated`,
        //   onCLickPath: "/user/appointments",
        // });
        // await user.save();

        // res.status(200).send({
        //   success: true,
        //   message: "Appointment Booked successfully",
        // });      

        //Payment


        var instance = new Razorpay({
          key_id: process.env.KEYID,
          key_secret: process.env.KEYSECRET,
        });
        // const checkout = async(req,res) => {
        //   try{             
        const options = {
          amount: req.body.fees * 100,
          currency: "INR",
          receipt: "null",
        };

        try {
          instance.orders.create(options, (error, order) => {
            if (!error) {
              console.log(order);
              console.log(order.id);
              return res.status(200).send({
                data: order,
                success: true,
                message: "Payment order created",
                keyid: process.env.KEYID,
                appointmentid: newEntry._id,
              });
            }
            else {
              return res.status(500).send({ success: false, message: "Failed to initiate payment" });
            }

            const razorpay_order_id = order;
          });
        }
        catch (err) {
          return res.status(400).send({ "Error occured": err.message });
        }


        // const verifyPayment = async(req,res) => {

        // };

        //Payment


      }
      else {
        return res.status(200).send({
          message: "Doctor is not available at your selected timing",
          success: false,
        });
      }

    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
  }
};


//Get Appointment List
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
      paymentStatus: "Paid",
    });
    const appointmentDate = moment(appointments.date).format("DD-MM-YYYY");
    const appointmentTime = moment(appointments.time).format("HH:mm");
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetched Successfully",
      data: appointments,
      // date: appointmentDate,
      // time: appointmentTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching User Appointments",
    });
  }
};

//Get User Data
const getUserData = async (req, res) => {
    // Create a document
    const doc = new PDFDocument();
     
    // // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream('example.pdf'));
     
    // // Adding functionality
    doc
        .fontSize(27)
        .text('This the article for GeeksforGeeks', 100, 100);
     
    // Adding an image in the pdf.
     
    doc.image('download3.jpg', {
        fit: [300, 300],
        align: 'center',
        valign: 'center'
    });
     
    doc
        .addPage()
        .fontSize(15)
        .text('Generating PDF with the help of pdfkit', 100, 100);
     
     
     
    // Apply some transforms and render an SVG path with the 
    // 'even-odd' fill rule
    doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();
     
    // Add some text with annotations
    doc
        .addPage()
        .fillColor('blue')
        .text('The link for GeeksforGeeks website', 100, 100)
        .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');

            // see the range of buffered pages
// const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }

// for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
//   doc.text(`Page ${i + 1} of ${range.count}`);
// }
doc.rect(50,30,50,60);
doc.text('The link for GeeksforGeeks website12', 100, 100);
doc.stroke();
    // Finalize PDF file
    doc.end();
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching user data",
    });
  }
}

const paymentForAppointment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.payment;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEYSECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const appointment = await appointmentModel.findOneAndUpdate(
        { _id: req.body.appointmentid },
        { paymentStatus: "Paid" },
        { paymentId: razorpay_payment_id },
        { razorpayOrderId: razorpay_order_id },
      );

      return res.status(200).send({ success: true, message: "Your appointment is booked successfully" });
    } else {
      await appointmentModel.deleteOne({ _id: req.body.appointmentid });
      return res.status(400).send({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).send({ sucess: false, message: "Internal Server Error!" });
    console.log(error);
  }
}

//Update User Data
const updateUserData = async (req, res) => {
  try {
    console.log(req.body.fname);
    console.log(req.body.userId);
    const updatedUser = await userModels.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    )
    if (updatedUser) {
      res.status(201).send({
        success: true,
        message: "User profile updated successfully",
        // data: doctor,
      });
    } else {
      res.status(201).send({
        success: false,
        message: "User profile was not updated",
        // data: doctor,
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating user data",
    });
  }
}


module.exports = { loginController, registerController, authController, applyDoctorController, getAllNoticationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, userAppointmentsController, updateUserData, getUserData, paymentForAppointment };