let wishlistController = require("../controller/wishlist.controller");

let express = require("express");
let router = express.Router();

router.post("/addToWishlist", wishlistController.addToWishlist);

router.post("/removeFromWishlist", wishlistController.removeFromWishlist);

router.post("/getWishlistByUserId", wishlistController.getWishlistByUserId);

module.exports = router;
