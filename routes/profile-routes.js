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
  "/:profileId/workExperience/:weId",
  profileControllers.getWorkExperienceById
);

router.get("/all", profileControllers.getAllProfiles);

router.get(
  "/workExperiences",
  profileControllers.getLatestProfileWorkExperiences
);

router.get("/:profileId", profileControllers.getProfileById);

router.get("/", profileControllers.getLatestProfile);

//create profile
router.post(
  "/create",
  [
    check("name").notEmpty(),
    check("age").isNumeric(),
    check("contactNumber").optional().isMobilePhone(),
    check("email").optional().isEmail(),
    check("description").notEmpty(),
    check("profileImage").optional().isDataURI(),
  ],
  profileControllers.createProfile
);

//create work experience for existing profile
router.post(
  "/:profileId/create",
  [
    check("weId").notEmpty(),
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
  "/:profileId/workExperience/:weId",
  [
    check("companyName").optional().notEmpty(),
    check("jobTitle").optional().notEmpty(),
    check("jobDescription").optional().notEmpty(),
    check("startDate").optional().isISO8601("YYYY-MM"),
    check("endDate").optional({ nullable: true }).isISO8601("YYYY-MM"),
    check("isCurrentJob").optional().isBoolean(),
    check("companyLogo").optional({ nullable: true }).isDataURI(),
  ],
  profileControllers.updateProfileWorkExperienceById
);

//update existing profile information
router.patch(
  "/:profileId",
  [
    check("name").optional().notEmpty(),
    check("age").optional().isNumeric(),
    check("contactNumber").optional({ nullable: true }).isMobilePhone(),
    check("email").optional({ nullable: true }).isEmail(),
    check("description").optional().notEmpty(),
    check("profileImage").optional({ nullable: true }).isDataURI(),
  ],
  profileControllers.updateProfileInformation
);

router.delete(
  "/:profileId/workExperience/:weId",
  profileControllers.removeWorkExperienceFromProfile
);

module.exports = router;
