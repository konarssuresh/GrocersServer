let mongoose = require("mongoose");
mongoose.pluralize(null);

let cartSchema = mongoose.Schema({
  userId: {type: String, default: 0, unique: true},
  items: {type: Array, default: []},
});

let cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel;
