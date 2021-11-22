let itemController = require("../controller/item.controller");
let express = require("express");

let router = express.Router();

router.post("/addItem", itemController.addNewItem);

router.get("/getItems", itemController.getAllItems);

router.put("/updateItem", itemController.updateItem);

router.delete("/deleteItem", itemController.deleteItem);

module.exports = router;
