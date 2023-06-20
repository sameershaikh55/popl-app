const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const CardModel = require("../models/card");
const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");
const sendEmail = require("../utils/sendEmail");
const getFiles = require("../utils/getFiles");
const path = require("path");
const fs = require("fs");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const isAdded = await RegistrationModel.findOne({
    email: req.body.email,
  });

  if (isAdded) {
    const imgPath = path.resolve(
      __dirname,
      "../../" + "public/images",
      req.file.filename
    );
    fs.unlinkSync(imgPath);

    return next(new ErrorHandler("email already registered", 400));
  }

  const cardData = await CardModel.create({
    _id: req.body._id,
    name: req.body.name,
    jobTitle: req.body.jobTitle,
    company: req.body.company,
    phone: req.body.phone,
    cardDP: req.body.cardDP,
    popCode: {
      logo: req.body.cardDP,
    },
    emailSignature: {
      profile: req.body.cardDP,
    },
  });

  const { email, password } = req.body;
  const userData = await RegistrationModel.create({ email, password });

  const userDataFind = await RegistrationModel.findById(userData._id);
  userDataFind.cards.push(cardData._id);
  await userDataFind.save();

  userDataFind.password = undefined;

  // IMAGE DELETE
  const allImages = getFiles(
    path.resolve(__dirname, "../../" + "public/images")
  );
  const properties = await CardModel.find();
  const cardDPFilteredProperties = properties.map(({ cardDP }) => cardDP);
  const coverDPFilteredProperties = properties.map(({ coverDP }) => coverDP);
  const companyDPFilteredProperties = properties.map(
    ({ companyDP }) => companyDP
  );
  const codeLogoFilteredProperties = properties.map(
    ({ popCode: { logo } }) => logo
  );
  const profileFilteredProperties = properties.map(
    ({ emailSignature: { profile } }) => profile
  );
  const companyFilteredProperties = properties.map(
    ({ emailSignature: { company } }) => company
  );
  const popCodeFilteredProperties = properties.map(
    ({ emailSignature: { popCode } }) => popCode
  );
  const cleanedPropertiesArray = [
    ...new Set(cardDPFilteredProperties.flat(Infinity)),
    ...new Set(coverDPFilteredProperties.flat(Infinity)),
    ...new Set(companyDPFilteredProperties.flat(Infinity)),
    ...new Set(codeLogoFilteredProperties.flat(Infinity)),
    ...new Set(profileFilteredProperties.flat(Infinity)),
    ...new Set(companyFilteredProperties.flat(Infinity)),
    ...new Set(popCodeFilteredProperties.flat(Infinity)),
  ];

  for (let i = 0; i < allImages.length; i++) {
    if (!cleanedPropertiesArray.includes(allImages[i])) {
      fs.unlinkSync(
        path.resolve(__dirname, "../../" + "public/images", allImages[i])
      );
    }
  }

  sendToken(userDataFind, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, businessAccount } = req.body;

  if (!email || !password) return next(new ErrorHandler("Invalid field", 422));

  const gettingRecord = await RegistrationModel.findOne({ email }).select(
    "+password"
  );

  if (!gettingRecord || gettingRecord.businessAccount != businessAccount)
    return next(new ErrorHandler("user not found", 404));

  const validPassword = await bcrypt.compare(password, gettingRecord.password);

  if (!validPassword)
    return next(new ErrorHandler("Invalid email and password", 400));

  gettingRecord.password = undefined;
  sendToken(gettingRecord, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  sendResponse(true, 200, "message", "logged out successfully", res);
});

// Forget Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await RegistrationModel.findOne({ email }).select(
    "+resetPasswordToken"
  );

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.PASSWORD_RESET_URL}/password/reset/${resetToken}`;

  const message = `Your password reset URL is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    sendResponse(
      true,
      200,
      "message",
      `Email sent to ${user.email} successfully`,
      res
    );
  } catch (error) {
    user.resetPasswordToken.token = undefined;
    user.resetPasswordToken.expire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password) {
    return next(new ErrorHandler("Invalid field", 422));
  }

  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await RegistrationModel.findOne({
    "resetPasswordToken.token": resetPasswordToken,
    "resetPasswordToken.expire": { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password URL is invalid or has been expired", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = password;
  user.resetPasswordToken.token = undefined;
  user.resetPasswordToken.expire = undefined;

  await user.save();

  sendResponse(true, 200, "message", "Password Reset Successfully!", res);
});
