let mongoose = require("mongoose");
mongoose.pluralize(null);

let counterSchema = mongoose.Schema({
  orderCount: {type: Number, default: 1},
});

let counterModel = mongoose.model("Counter", counterSchema);
module.exports = counterModel;
