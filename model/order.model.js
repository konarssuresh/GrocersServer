let mongoose = require("mongoose");
let autoIncrement = require("mongoose-auto-increment");
mongoose.pluralize(null);

let orderSchema = new mongoose.Schema({
  userId: {type: String},
  items: {type: Array},
  billedPrice: {type: Number},
  orderId: {type: Number, default: 0, unique: true},
});

module.exports = mongoose.model("orders", orderSchema);

autoIncrement.initialize(mongoose.connection); // This is important. You can remove initialization in different file
orderSchema.plugin(autoIncrement.plugin, {
  model: "orders",
  field: "orderId",
  startAt: 1,
  incrementBy: 1,
});
