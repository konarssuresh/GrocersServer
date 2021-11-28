let cartModel = require("../model/cart.model");

let addToCart = (req, res, next) => {
  cartModel.findOne({userId: req.body?.userId}, (err, result) => {
    if (!err) {
      if (!result) {
        cartModel.insertMany(req?.body, (err) => {
          if (!err) {
            res.send({message: "item added to cart"});
          } else {
            next(err);
          }
        });
      } else {
        const cart = result.items;
        const newItems = req?.body?.items[0];
        let itemIndex = cart.findIndex(
          (item) => item.name === newItems.name && item.price === newItems.price
        );
        if (itemIndex === -1) {
          cartModel.findOneAndUpdate(
            {userId: req.body?.userId},
            {items: [...cart, newItems]},
            (err) => {
              if (!err) {
                res.send({message: "item added to cart"});
              } else {
                next(err);
              }
            }
          );
        } else {
          cart[itemIndex].quantity =
            cart[itemIndex].quantity + newItems.quantity;
          cartModel.findOneAndUpdate(
            {userId: req.body?.userId},
            {items: cart},
            (err) => {
              if (!err) {
                res.send({message: "item added to cart"});
              } else {
                next(err);
              }
            }
          );
        }
      }
    } else {
      next(err);
    }
  });
};

let removeFromCart = (req, res, next) => {
  cartModel.findOne({userId: req.body?.userId}, (err, result) => {
    if (!err) {
      if (result) {
        const cartItems = result.items;
        const newItems = req?.body?.items[0];
        let itemIndex = cartItems.findIndex(
          (item) => item.name === newItems.name && item.price === newItems.price
        );
        if (itemIndex !== -1) {
          cartItems.splice(itemIndex, 1);
          cartModel.findOneAndUpdate(
            {userId: req.body?.userId},
            {items: cartItems},
            (err) => {
              if (!err) {
                res.send({message: "item removed from cart"});
              } else {
                next(err);
              }
            }
          );
        } else {
          res.send({message: "item not found in cart"});
        }
      } else {
        res.send({message: "cart not found"});
      }
    } else {
      next(err);
    }
  });
};

let getCartByUserId = (req, res, next) => {
  cartModel.findOne({userId: req.body?.userId}, (err, result) => {
    if (!err) {
      if (!result) {
        res.send({message: "user not found"});
      } else {
        res.send(result);
      }
    } else {
      next(err);
    }
  });
};

let emptyCart = (req, res, next) => {
  cartModel.findOneAndUpdate({userId: req.body?.userId}, {items: []}, (err) => {
    if (!err) {
      res.send({message: "cart emptied successfully"});
    } else {
      next(err);
    }
  });
};

module.exports = {addToCart, removeFromCart, getCartByUserId, emptyCart};
