let orderModel = require("../model/order.model");
let counterModel = require("../model/counter.model");
let itemModel = require("../model/item.model");

let addOrder = (req, res, next) => {
  let {items} = req.body;

  items.forEach(({name, price, quantity = 0}) => {
    itemModel.findOne({name, price}, (err, item) => {
      if (!err) {
        itemModel.updateOne(
          {name, price},
          {quantity: item?.quantity - quantity},
          (err) => {
            if (err) {
              next(err);
            }
          }
        );
      } else {
        next(err);
      }
    });
  });

  counterModel.find({}, (err, results) => {
    if (!err) {
      const counts = results[0];
      const {orderCount} = counts;
      orderModel.insertMany({orderId: orderCount + 1, ...req.body}, (err) => {
        if (!err) {
          counterModel.updateOne(
            {orderCount},
            {orderCount: orderCount + 1},
            (err) => {
              if (!err) {
                res.send({message: `Order placed successfully`});
              } else {
                next(err);
              }
            }
          );
        } else {
          next(err);
        }
      });
    }
  });
};

let getOrderByUserId = (req, res, next) => {
  let {userId} = req.body;
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
