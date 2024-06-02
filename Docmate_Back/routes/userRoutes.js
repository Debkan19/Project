const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNoticationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  getUserData,
  updateUserData,
  paymentForAppointment,
  userAppointmentsController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification || POST
router.post("/get-all-notification", authMiddleware, getAllNoticationController);

//Notifiaction  Doctor || POST
router.post(
    "/delete-all-notification",
    authMiddleware,
    deleteAllNotificationController
  );

  //GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//Auth || POST
router.post("/getUserInfo", authMiddleware, getUserData);


//Auth || POST
router.post("/updateUserProfile", authMiddleware, updateUserData);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//VERIFY PAYMENT
router.post("/verifing-payment", authMiddleware, paymentForAppointment);

//Appointment List
router.get("/user-appointments", authMiddleware, userAppointmentsController);
module.exports = router;