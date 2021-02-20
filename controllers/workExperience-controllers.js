// const { v4: uuidv4 } = require("uuid");
// const { validationResult } = require("express-validator");

// const WorkExperience = require("../models/workExperience.js");
// const HttpError = require("../models/http-error.js");

// let DUMMY_PROFILE = [
//   {
//     profileId: "1",
//     name: "Hui Hui",
//     age: "21",
//     email: "hui@mail.com",
//     contact: "95123456",
//     workExperiences: [
//       {
//         workExperienceId: "1",
//         companyName: "NUS",
//         jobTitle: "Student",
//         jobDescription: "Study!",
//         startDate: "Aug 2019",
//         endDate: null,
//         isCurrentJob: true,
//         companyImage: null,
//       },
//       {
//         workExperienceId: "2",
//         companyName: "Raffles Hall",
//         jobTitle: "RHesident",
//         jobDescription: "Nothing..",
//         startDate: "Aug 2020",
//         endDate: null,
//         isCurrentJob: true,
//         companyImage: null,
//       },
//     ],
//   },
//   {
//     profileId: "2",
//     name: "Hui",
//     age: "221",
//     email: "hui@aamail.com",
//     contact: "95123456",
//     workExperiences: [],
//   },
// ];

// const getAllWorkExperiences = (req, res, next) => {
//   const profileId = req.params.profileId;

//   const profile = DUMMY_PROFILE.find((p) => {
//     return p.profileId === profileId;
//   });

//   if (!profile) {
//     return next(
//       new HttpError(
//         "Could not find a profile for the provided profile id.",
//         404
//       )
//     );
//   }

//   const profileIndex = DUMMY_PROFILE.findIndex(
//     (p) => p.profileId === profileId
//   );

//   const workExperiences = DUMMY_PROFILE[profileIndex].workExperiences;

//   res.json({ workExperiences: workExperiences });
// };

// const getWorkExperienceById = (req, res, next) => {
//   const workExperienceId = req.params.workExperienceId;
//   const profileId = req.params.profileId;

//   const profile = DUMMY_PROFILE.find((p) => {
//     return p.profileId === profileId;
//   });

//   if (!profile) {
//     return next(
//       new HttpError(
//         "Could not find a profile for the provided profile id.",
//         404
//       )
//     );
//   }

//   const workExperience = profile.workExperiences.find((p, index) => {
//     return p.workExperienceId === workExperienceId;
//   });

//   if (!workExperience) {
//     return next(
//       new HttpError(
//         "Could not find a work experience for the provided work experience id.",
//         404
//       )
//     );
//   }

//   res.json({ workExperience: workExperience });
// };

// const createWorkExperience = (req, res, next) => {
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     console.log(error);
//     const err = new HttpError(
//       "Invalid inputs passed, please check your data",
//       422
//     );
//     return next(err);
//   }

//   const {
//     profileId,
//     companyName,
//     jobTitle,
//     jobDescription,
//     startDate,
//     endDate,
//     isCurrentJob,
//     companyImage,
//   } = req.body;

//   const createdWorkExperience = new WorkExperience({
//     profileId,
//     companyName,
//     jobTitle,
//     jobDescription,
//     startDate,
//     endDate,
//     isCurrentJob,
//     companyImage,
//   });

//   const profileIndex = DUMMY_PROFILE.findIndex(
//     (p) => p.profileId === profileId
//   );

//   DUMMY_PROFILE[profileIndex].workExperiences.push(createdWorkExperience);

//   // try {
//   //   createdWorkExperience.save();
//   // } catch (error) {
//   //   const err = new HttpError(
//   //     "Creating work experience failed, please try again.",
//   //     500
//   //   );
//   //   return next(err);
//   // }

//   res.status(201).json({ workExperience: createdWorkExperience });
// };

// const updateWorkExperience = (req, res, next) => {
//   const {
//     companyName,
//     jobTitle,
//     jobDescription,
//     startDate,
//     endDate,
//     isCurrentJob,
//     companyImage,
//   } = req.body;

//   const profileId = req.params.profileId;
//   const workExperienceId = req.params.workExperienceId;

//   const profileIndex = DUMMY_PROFILE.findIndex(
//     (p) => p.profileId === profileId
//   );

//   const updateWorkExperience = {
//     ...DUMMY_PROFILE[profileIndex].workExperiences.find((w) => {
//       return w.workExperienceId === workExperienceId;
//     }),
//   };

//   const workExperienceIndex = DUMMY_PROFILE[
//     profileIndex
//   ].workExperiences.findIndex((w) => {
//     return w.workExperienceId === workExperienceId;
//   });

//   updateWorkExperience.companyName = companyName;
//   updateWorkExperience.jobTitle = jobTitle;
//   updateWorkExperience.jobDescription = jobDescription;
//   updateWorkExperience.startDate = startDate;
//   updateWorkExperience.endDate = endDate;
//   updateWorkExperience.isCurrentJob = isCurrentJob;
//   updateWorkExperience.companyImage = companyImage;

//   DUMMY_PROFILE[profileIndex].workExperiences[
//     workExperienceIndex
//   ] = updateWorkExperience;

//   res.status(200).json({ workExperience: updateWorkExperience });
// };

// const deleteWorkExperience = (req, res, next) => {
//   const profileId = req.params.profileId;
//   const workExperienceId = req.params.workExperienceId;

//   const profileIndex = DUMMY_PROFILE.findIndex(
//     (p) => p.profileId === profileId
//   );

//   if (
//     !DUMMY_PROFILE[profileIndex].workExperiences.find(
//       (w) => w.workExperienceId === workExperienceId
//     )
//   ) {
//     return next(
//       new HttpError(
//         "Could not find work experience the specified work experied id.",
//         404
//       )
//     );
//   }

//   DUMMY_PROFILE = DUMMY_PROFILE[profileIndex].workExperiences.filter((w) => {
//     return w.workExperienceId !== workExperienceId;
//   });

//   res.status(200).json({ message: "Deleted work experience." });
// };

// exports.getAllWorkExperiences = getAllWorkExperiences;
// exports.getWorkExperienceById = getWorkExperienceById;
// exports.createWorkExperience = createWorkExperience;
// exports.updateWorkExperience = updateWorkExperience;
// exports.deleteWorkExperience = deleteWorkExperience;
