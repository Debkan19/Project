const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    docDetails: {
      type: Array,
      default: [],
    },
    userDetails: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Unpaid",
    },
    paymentId: {
      type: String,
      required: true,
      default: "",
    },
    razorpayOrderId: {
      type: String,
      required: true,
      default: "",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;