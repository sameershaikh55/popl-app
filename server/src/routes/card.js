const express = require("express");
const router = express.Router();
const uploadDP = require("../utils/imageUpload");
const uploadCover = require("../utils/imageUploadCover");
const uploadCompany = require("../utils/imageUploadCompany");
const popCodeLogo = require("../utils/popCodeLogo");
const imageUploadProfile = require("../utils/imageUploadProfile");
const imageUploadCompany = require("../utils/imageUploadCompany");
const imageUploadPopCode = require("../utils/imageUploadPopCode");
const imageUploadCompanySign = require("../utils/imageUploadCompanySign");
const VBUpload = require("../utils/VBUpload");

// MIDDLEWARE
const { authentication } = require("../middleware/authentication");

// CONTROLLERS
const {
  getCards,
  getCard,
  updateCard,
  updateCardCover,
  updateCardCompany,
  updateCardProfile,
  updateCardPopcode,
  updateSignCompany,
  updateSignPopCode,
  updateSignProfile,
  updateVirtualBackground,
  updateVirtualBackgroundData,
  updateSocialData,
  updateSocialDataSwitch,
  updateVirtualBackgroundCheckboxes,
} = require("../controller/card");

// ROUTES
router.route("/all").get(authentication, getCards);
router
  .route("/:id")
  .get(authentication, getCard)
  .patch(authentication, updateCard);

router
  .route("/profile/:id")
  .patch(authentication, uploadDP.single("cardDP"), updateCardProfile);
router
  .route("/cover/:id")
  .patch(authentication, uploadCover.single("coverDP"), updateCardCover);
router
  .route("/company/:id")
  .patch(authentication, uploadCompany.single("companyDP"), updateCardCompany);
router
  .route("/codeLogo/:id")
  .patch(authentication, popCodeLogo.single("logo"), updateCardPopcode);
router
  .route("/vb/color/:id")
  .patch(authentication, updateVirtualBackgroundData);
router
  .route("/vb/checkboxes/:id")
  .patch(authentication, updateVirtualBackgroundCheckboxes);

// SIGNATURE
router
  .route("/sign/profile/:id")
  .patch(
    authentication,
    imageUploadProfile.single("profile"),
    updateSignProfile
  );
router
  .route("/sign/company/:id")
  .patch(
    authentication,
    imageUploadCompanySign.single("company"),
    updateSignCompany
  );
router
  .route("/sign/popcode/:id")
  .patch(
    authentication,
    imageUploadPopCode.single("popCode"),
    updateSignPopCode
  );
router
  .route("/vb/picture/:id")
  .patch(authentication, VBUpload.single("picture"), updateVirtualBackground);
router.route("/social/:id").post(authentication, updateSocialData);
router.route("/social/update/:id").post(authentication, updateSocialDataSwitch);

module.exports = router;
