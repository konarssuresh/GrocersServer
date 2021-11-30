let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let port = 9090 || process.env.port;
let url =
  "mongodb+srv://suresh0608:suresh0608@cluster0.esfoo.mongodb.net/grocersApp?retryWrites=true&w=majority";

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let app = express();
let userRouter = require("./router/user.router");
let itemRouter = require("./router/item.router");
let orderRouter = require("./router/order.router");
let wishlistRouter = require("./router/wishlist.router");
let cartRouter = require("./router/cart.router");

app.use(express.json());
app.use(cors());

mongoose
  .connect(url, mongooseOptions)
  .then((result) => console.log("connected"))
  .catch((e) => console.log(error));

app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wishlists", wishlistRouter);
app.use("/api/carts", cartRouter);

let server = app.listen(port, () => console.log(`app running on port ${port}`));

module.exports = server;
