let mongoose = require("mongoose");
mongoose.pluralize(null);

let itemSchema = mongoose.Schema({
  itemId: String,
  name: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  expiryDate: Date,
});

let itemModel = mongoose.model("items", itemSchema);

module.exports = itemModel;
