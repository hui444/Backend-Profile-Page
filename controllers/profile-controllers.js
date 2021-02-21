const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const Profile = require("../models/profile.js");
const HttpError = require("../models/http-error.js");

const getAllProfiles = async (req, res, next) => {
  let profiles;
  try {
    profiles = await Profile.find();
  } catch (error) {
    const err = new HttpError(
      "Fetching profiles failed, please try again later.",
      500
    );
    return next(err);
  }

  if (!profiles || profiles.length === 0) {
    return next(new HttpError("There are no profiles, create one!"));
  }

  res.json({
    profiles: profiles.map((profile) => profile.toObject({ getters: true })),
  });
};

const getProfileById = async (req, res, next) => {
  const profileId = req.params.profileId;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find that profile",
      500
    );
    return next(err);
  }

  if (!profile) {
    return next(
      new HttpError(
        "Could not find a profile for the provided profile id.",
        404
      )
    );
  }

  res.json({ profile: profile.toObject({ getters: true }) });
};

const updateProfileInformation = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    const err = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(err);
  }

  const { name, age, email, contactNumber, profileImage } = req.body;
  const profileId = req.params.profileId;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(err);
  }

  profile.name = name;
  profile.age = age;
  profile.email = email;
  profile.contactNumber = contactNumber;
  profile.profileImage = profileImage;

  try {
    await profile.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(err);
  }

  res.status(200).json({ profile: profile.toObject({ getters: true }) });
};

const createProfile = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const {
    name,
    age,
    email,
    contactNumber,
    profileImage,
    workExperiences,
  } = req.body;

  const createdProfile = new Profile({
    name,
    age,
    email,
    contactNumber,
    profileImage,
    workExperiences,
  });

  try {
    createdProfile.save();
  } catch (error) {
    const err = new HttpError("Creating profile failed, please try again", 500);
    return next(err);
  }

  res.status(201).json({ profile: createdProfile.toObject({ getters: true }) });
};

const getAllProfileWorkExperience = async (req, res, next) => {
  const profileId = req.params.profileId;
  let workExperiences, profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Fetching profile failed, please try again later",
      500
    );
    return next(err);
  }

  workExperiences = profile.workExperiences;

  res.status(200).json({
    workExperiences: workExperiences,
  });
};

const getWorkExperienceById = async (req, res, next) => {
  const profileId = req.params.profileId;
  const workExperienceId = req.params.workExperienceId;

  let profile, workExperience;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Fetching profile failed, please try again later.",
      500
    );
    return next(err);
  }

  try {
    workExperience = profile.workExperiences.find(
      (w) => w.workExperienceId === workExperienceId
    );
  } catch (error) {
    const err = new HttpError(
      "Could not find work experience of given profile and work experience id",
      500
    );
    return next(err);
  }

  console.log(workExperience);
  res.status(200).json({
    workExperience: workExperience,
  });
};

const updateProfileWorkExperienceById = async (req, res, next) => {
  const {
    companyName,
    jobTitle,
    jobDescription,
    startDate,
    endDate,
    isCurrentJob,
    companyLogo,
  } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  const profileId = req.params.profileId;
  const workExperienceId = req.params.workExperienceId;

  console.log(companyLogo);
  let profile, workExperienceIndex;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Fetching profile failed, please try again later.",
      500
    );
    return next(err);
  }

  workExperienceIndex = profile.workExperiences.findIndex(
    (w) => w.workExperienceId === workExperienceId
  );

  if (workExperienceIndex === -1) {
    const err = new HttpError(
      "Could not find work experience of given profile and work experience id",
      500
    );
    return next(err);
  }

  const newWorkExperience = {
    workExperienceId: workExperienceId,
    companyName,
    jobTitle,
    jobDescription,
    startDate,
    endDate,
    isCurrentJob,
    companyLogo,
  };

  profile.workExperiences.set(workExperienceIndex, newWorkExperience);

  try {
    await profile.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(err);
  }

  res.status(200).json({
    message: "Selected profile has been successfully updated.",
    profile: profile.workExperiences,
  });
};

const addNewWorkExperienceToProfile = async (req, res, next) => {
  const {
    workExperienceId,
    companyName,
    jobTitle,
    jobDescription,
    startDate,
    endDate,
    isCurrentJob,
    companyLogo,
  } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const profileId = req.params.profileId;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Fetching profile failed, please try again later.",
      500
    );
    return next(err);
  }

  const newWorkExperience = {
    workExperienceId,
    companyName,
    jobTitle,
    jobDescription,
    startDate,
    ...(endDate && {
      endDate: endDate,
    }),
    isCurrentJob,
    ...(companyLogo && {
      companyLogo: companyLogo,
    }),
  };

  profile.workExperiences.push(newWorkExperience);

  try {
    await profile.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(err);
  }

  res.status(200).json({ message: "New work experience successfully added." });
};

const removeWorkExperienceFromProfile = async (req, res, next) => {
  const profileId = req.params.profileId;
  const workExperienceId = req.params.workExperienceId;

  let profile;
  try {
    profile = await Profile.findById(profileId);
  } catch (error) {
    const err = new HttpError(
      "Fetching profile failed, please try again later.",
      500
    );
    return next(err);
  }

  profile.workExperiences = profile.workExperiences.filter(
    (w) => w.workExperienceId !== workExperienceId
  );

  console.log(profile);
  try {
    await profile.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not update profile",
      500
    );
    return next(err);
  }

  res
    .status(200)
    .json({ message: "Selected work experience was successfully deleted." });
};

exports.getAllProfiles = getAllProfiles;
exports.getProfileById = getProfileById;
exports.updateProfileInformation = updateProfileInformation;
exports.createProfile = createProfile;
exports.getAllProfileWorkExperience = getAllProfileWorkExperience;
exports.getWorkExperienceById = getWorkExperienceById;
exports.updateProfileWorkExperienceById = updateProfileWorkExperienceById;
exports.addNewWorkExperienceToProfile = addNewWorkExperienceToProfile;
exports.removeWorkExperienceFromProfile = removeWorkExperienceFromProfile;
