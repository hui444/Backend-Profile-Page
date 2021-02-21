const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const profileRoutes = require("./routes/profile-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/profile", profileRoutes);

app.use((req, res, next) => {
  const err = new HttpError("Could not find this route", 404);
  throw err;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unkown error occurred!" });
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.taade.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose
  .connect(uri, connectConfig)
  .then(() => {
    console.log("+++ Database connected! +++");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
