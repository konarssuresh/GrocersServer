let mongoose = require("mongoose");
mongoose.pluralize(null);

let wishlistSchema = mongoose.Schema({
  userId: {type: String, default: 0, unique: true},
  items: {type: Array, default: []},
});

let wishlistModel = mongoose.model("wishlists", wishlistSchema);
module.exports = wishlistModel;
