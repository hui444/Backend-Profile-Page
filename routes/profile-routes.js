const express = require("express");
const { check } = require("express-validator");

const profileControllers = require("../controllers/profile-controllers");

const router = express.Router();

//get all work experiences of a profile
router.get(
  "/:profileId/workExperience/all",
  profileControllers.getAllProfileWorkExperience
);

//get specified work experience of a profile
router.get(
  "/:profileId/workExperience/:workExperienceId",
  profileControllers.getWorkExperienceById
);

router.get("/all", profileControllers.getAllProfiles);

router.get("/:profileId", profileControllers.getProfileById);

//create profile
router.post(
  "/create",
  [
    check("name").notEmpty(),
    check("age").isNumeric(),
    check("contact").optional().isMobilePhone(),
    check("email").optional().isEmail(),
    check("profilePhoto").optional().isDataURI(),
    check("workExperiences").optional().isArray(),
  ],
  profileControllers.createProfile
);

//create work experience for existing profile
router.post(
  "/:profileId/create",
  [
    check("workExperienceId").notEmpty(),
    check("companyName").notEmpty(),
    check("jobTitle").notEmpty(),
    check("jobDescription").notEmpty(),
    check("startDate").isISO8601("YYYY-MM"),
    check("endDate").optional().isISO8601("YYYY-MM"),
    check("isCurrentJob").isBoolean(),
    check("companyLogo").optional().isDataURI(),
  ],
  profileControllers.addNewWorkExperienceToProfile
);

//update work experience of selected profile
router.patch(
  "/:profileId/workExperience/:workExperienceId",
  [
    check("companyName").notEmpty(),
    check("jobTitle").notEmpty(),
    check("jobDescription").notEmpty(),
    check("startDate").isISO8601("YYYY-MM"),
    check("endDate").optional().isISO8601("YYYY-MM"),
    check("isCurrentJob").isBoolean(),
    check("companyLogo").optional().isDataURI(),
  ],
  profileControllers.updateProfileWorkExperienceById
);

//update existing profile information
router.patch(
  "/:profileId",
  [
    check("name").notEmpty(),
    check("age").isNumeric(),
    check("contact").optional().isMobilePhone(),
    check("email").optional().isEmail(),
    check("profilePhoto").optional().isDataURI(),
    check("workExperiences").optional().isArray(),
  ],
  profileControllers.updateProfileInformation
);

router.delete(
  "/:profileId/workExperience/:workExperienceId",
  profileControllers.removeWorkExperienceFromProfile
);

module.exports = router;
