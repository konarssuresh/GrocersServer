let itemModel = require("../model/item.model");

let addNewItem = (req, res, next) => {
  console.log(req.body);
  const {name, price, ...remainingProps} = req.body;
  itemModel.findOne({name, price}, (err, result) => {
    if (!err) {
      if (result === null) {
        itemModel.insertMany(
          {
            name,
            price,
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
  let {_id, ...remainingProps} = req.body;

  itemModel.updateOne({_id}, {...remainingProps}, (err, result) => {
    console.log(result);
    if (!err) {
      res.send({message: "item updated successfully"});
    } else {
      next(err);
    }
  });
};

let deleteItem = (req, res, next) => {
  let {_id} = req.body;

  itemModel.deleteMany({_id}, (err) => {
    if (!err) {
      res.send({message: `item ${_id} is deleted successfully`});
    } else {
      next(err);
    }
  });
};

let findItemById = (req, res, next) => {
  let {_id} = req.body;
  itemModel.findOne({_id}, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      next(err);
    }
  });
};

module.exports = {
  addNewItem,
  getAllItems,
  updateItem,
  deleteItem,
  findItemById,
};
