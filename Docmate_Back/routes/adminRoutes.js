const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatus,
  changeStatus
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST METHOD || DOCTORS
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus);

//POST METHOD || USERS
router.post("/changeUserAccountStatus", authMiddleware, changeStatus);

module.exports = router;