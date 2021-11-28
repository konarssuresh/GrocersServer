let orderController = require("../controller/order.controller");

let express = require("express");
let router = express.Router();

router.post("/placeOrder", orderController.addOrder);

router.post("/getOrders", orderController.getOrderByUserId);

router.delete("/cancelOrder", orderController.deleteOrder);

module.exports = router;
