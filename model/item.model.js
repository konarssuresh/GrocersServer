let mongoose = require("mongoose");
mongoose.pluralize(null);

let itemSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  expiryDate: Date,
});

let itemModel = mongoose.model("items", itemSchema);

module.exports = itemModel;
