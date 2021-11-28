let wishlistModel = require("../model/wishlist.model");

let addToWishlist = (req, res, next) => {
  wishlistModel.findOne({userId: req.body?.userId}, (err, result) => {
    if (!err) {
      if (!result) {
        wishlistModel.insertMany(req?.body, (err) => {
          if (!err) {
            res.send({message: "wishlist successful"});
          } else {
            next(err);
          }
        });
      } else {
        const wishlistItems = result.items;
        const newItems = req?.body?.items[0];
        let itemIndex = wishlistItems.findIndex(
          (item) => item.name === newItems.name && item.price === newItems.price
        );
        if (itemIndex === -1) {
          wishlistModel.findOneAndUpdate(
            {userId: req.body?.userId},
            {items: [...wishlistItems, newItems]},
            (err) => {
              if (!err) {
                res.send({message: "wishlist successful"});
              } else {
                next(err);
              }
            }
          );
        } else {
          res.send({message: "wishlist successful"});
        }
      }
    } else {
      next(err);
    }
  });
};

let removeFromWishlist = (req, res, next) => {
  wishlistModel.findOne({userId: req.body?.userId}, (err, result) => {
    if (!err) {
      if (result) {
        const wishlistItems = result.items;
        const newItems = req?.body?.items[0];
        let itemIndex = wishlistItems.findIndex(
          (item) => item.name === newItems.name && item.price === newItems.price
        );
        if (itemIndex !== -1) {
          wishlistItems.splice(itemIndex, 1);
          wishlistModel.findOneAndUpdate(
            {userId: req.body?.userId},
            {items: wishlistItems},
            (err) => {
              if (!err) {
                res.send({message: "item removed from wishlist"});
              } else {
                next(err);
              }
            }
          );
        } else {
          res.send({message: "item not found in wishlist"});
        }
      } else {
        res.send({message: "wishlist not found"});
      }
    } else {
      next(err);
    }
  });
};

let getWishlistByUserId = (req, res, next) => {
  wishlistModel.findOne({userId: req.body?.userId}, (err, result) => {
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

module.exports = {addToWishlist, removeFromWishlist,getWishlistByUserId};
