let cartController = require("../controller/cart.controller");

let express = require("express");
let router = express.Router();

router.post("/addToCart", cartController.addToCart);

router.post("/removeFromCart", cartController.removeFromCart);

router.post("/getCartByUserId", cartController.getCartByUserId);

router.post("/emptyCart", cartController.emptyCart);

module.exports = router;
