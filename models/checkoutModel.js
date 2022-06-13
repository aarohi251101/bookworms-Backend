const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  shippingAdress: String,
  shippingStatus: String,
  user: { type: mongoose.Types.ObjectId, ref: "users" },
  novel: { type: mongoose.Types.ObjectId, ref: "novels" },
  createdAt: Date,
});

const checkoutModel = mongoose.model("checkout", mySchema);

module.exports =  checkoutModel ;