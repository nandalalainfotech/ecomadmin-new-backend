import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import otpGenerator from "otp-generator";
import OTP from "../Models/otpModel.js";



const otpRouter = express.Router();

otpRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    
    const { email } = req.body;

    
    const otpnum = OTP({
        email: req.body.email,
        otp: otp,
        from: msg.from,
    });
    const otpSender = await otpnum.save();
    res.send({ message: "Otp Created", newOtp: otpSender });
  })
);

otpRouter.get('/otpList', expressAsyncHandler(async(req, res) => {
  const otps = await OTP.find();
  if (otps) {
      res.send(otps);
  } else {
      res.status(404).send({ message: 'Women Product Not Found' });
  }
}));

export default otpRouter;
