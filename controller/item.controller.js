let itemModel = require("../model/item.model");

let addNewItem = (req, res, next) => {
  const {itemId, ...remainingProps} = req.body;
  itemModel.findOne({itemId}, (err, result) => {
    if (!err) {
      if (result === null) {
        itemModel.insertMany(
          {
            itemId,
            ...remainingProps,
          },
          (err) => {
            if (!err) {
              res.json({message: "item added successfully"});
            } else {
              next(err);
            }
          }
        );
      } else {
        res.json({message: "item  already exists"});
      }
    } else {
      next(err);
    }
  });
};

let getAllItems = (req, res, next) => {
  itemModel.find({}, (err, results) => {
    if (!err) {
      res.send(results);
    } else {
      next(err);
    }
  });
};

let updateItem = (req, res, next) => {
  let {itemId, ...remainingProps} = req.body;
  const id = itemId.toLowerCase();
  itemModel.updateOne({itemId: id}, {...remainingProps}, (err) => {
    if (!err) {
      res.send({message: "item updated successfully"});
    } else {
      next(err);
    }
  });
};

let deleteItem = (req, res, next) => {
  let {itemId} = req.body;
  const id = itemId.toLowerCase();

  itemModel.deleteMany({itemId: id}, (err) => {
    if (!err) {
      res.send({message: `item ${id} is deleted successfully`});
    } else {
      next(err);
    }
  });
};

module.exports = {addNewItem, getAllItems, updateItem, deleteItem};
