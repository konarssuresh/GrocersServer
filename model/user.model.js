let mongoose = require("mongoose");

mongoose.pluralize(null);

let userSchema = mongoose.Schema({
  userId: String,
  password: String,
  firstName: String,
  lastName: String,
  userType: String,
  dateOfBirth: Date,
});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
