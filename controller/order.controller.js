let orderModel = require("../model/order.model");
let itemModel = require("../model/item.model");

let addOrder = (req, res, next) => {
  let {items} = req.body;

  items.forEach(({itemId = "", quantity = 0}) => {
    itemModel.findOne({itemId}, (err, item) => {
      if (!err) {
        itemModel.updateOne(
          {itemId},
          {quantity: item?.quantity - quantity},
          (err, result) => {
            console.log(result);
          }
        );
      } else {
        next(err);
      }
    });
  });

  orderModel.insertMany(req.body, (err) => {
    if (!err) {
      res.send({message: `Order placed successfully`});
    } else {
      next(err);
    }
  });
};

let getOrderByUserId = (req, res, next) => {
  let {userId} = req.params;
  orderModel.find({userId}, (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      next(err);
    }
  });
};

let deleteOrder = (req, res, next) => {
  const {orderId} = req.body;
  orderModel.findOne({orderId}, (err, {items}) => {
    if (!err) {
      items.forEach(({itemId = "", quantity = 0}) => {
        itemModel.findOne({itemId}, (err, item) => {
          if (!err) {
            itemModel.updateOne(
              {itemId},
              {quantity: item?.quantity + quantity},
              (err, result) => {
                console.log(result);
              }
            );
          } else {
            next(err);
          }
        });
      });
      orderModel.deleteOne({orderId}, (err) => {
        if (!err) {
          res.send({message: "Order cancelled successfully"});
        } else {
          next(err);
        }
      });
    }
  });
};

module.exports = {addOrder, getOrderByUserId, deleteOrder};
