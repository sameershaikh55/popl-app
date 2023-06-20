const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendResponse = require("../utils/sendResponse");
const RegistrationModel = require("../models/registration");
const CardModel = require("../models/card");

// GET USER DATA WITH TOKEN AUTHENTICATION
exports.getCards = catchAsyncErrors(async (req, res, next) => {
  const userCards = await RegistrationModel.findById(res.user._id).populate(
    "cards"
  );

  sendResponse(true, 200, "cards", userCards.cards, res);
});

// GET CARD DATA
exports.getCard = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);

  sendResponse(true, 200, "card", card, res);
});

// UPDATE CARD DATA
exports.updateCard = catchAsyncErrors(async (req, res, next) => {
  const updated = await CardModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  sendResponse(true, 200, "card", updated, res);
});

// UPDATE CARD PROFILE
exports.updateCardProfile = catchAsyncErrors(async (req, res, next) => {
  const updated = await CardModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  sendResponse(true, 200, "card", updated, res);
});

// UPDATE CARD COVER
exports.updateCardCover = catchAsyncErrors(async (req, res, next) => {
  const updated = await CardModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  sendResponse(true, 200, "card", updated, res);
});

// UPDATE CARD COMPANY
exports.updateCardCompany = catchAsyncErrors(async (req, res, next) => {
  const updated = await CardModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  console.log(req.body, "body");
  console.log(updated);

  sendResponse(true, 200, "card", updated, res);
});

// UPDATE Popcode
exports.updateCardPopcode = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  card.popCode.logo = req.body.logo;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE Profile
exports.updateSignProfile = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  card.emailSignature.profile = req.body.profile;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE company
exports.updateSignCompany = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  card.emailSignature.company = req.body.company;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE Sign Code
exports.updateSignPopCode = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  card.emailSignature.popCode = req.body.popCode;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE VB PIC
exports.updateVirtualBackground = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  card.virtualBackground.picture = req.body.picture;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE VB DATA
exports.updateVirtualBackgroundData = catchAsyncErrors(
  async (req, res, next) => {
    const card = await CardModel.findById(req.params.id);
    card.virtualBackground.color = req.body.color;
    card.save({ new: true });

    sendResponse(true, 200, "card", card, res);
  }
);

// UPDATE VB DATA
exports.updateSocialData = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);
  const data = {
    email: "email" in req.body ? req.body.email : "",
    username: "username" in req.body ? req.body.username : "",
    phoneNumber: "phoneNumber" in req.body ? req.body.phoneNumber : "",
    linkTitle: "linkTitle" in req.body ? req.body.linkTitle : "",
    socialName: req.body.socialName,
    socialIcon: req.body.socialIcon,
  };
  card.social.push({ ...data });
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});

// UPDATE SWITCH
exports.updateSocialDataSwitch = catchAsyncErrors(async (req, res, next) => {
  const card = await CardModel.findById(req.params.id);

  const socialList = card.social.map((item) => {
    let ID = item._id.toString();
    if (ID == req.body._id) return { ...item, active: req.body.active };
    else return item;
  });

  card.social = socialList;
  card.save({ new: true });

  sendResponse(true, 200, "card", card, res);
});
