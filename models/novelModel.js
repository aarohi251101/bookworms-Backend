const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  thumbnail: String,
  author: String,
  user:{type:mongoose.Types.ObjectId,ref:"user"},
  price:Number,
  rentprice:Number,
  rentable:Boolean,
  exchangeble:Boolean,
  createdAt: { type: Date, default: new Date() },
});

const novelModel = mongoose.model("novel", mySchema);

module.exports = novelModel;