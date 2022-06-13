const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  title: String,
  description: String,
  isresolved: {type:Boolean,default:false},
  user:{type:mongoose.Types.ObjectId,ref:"user"},
  createdAt: { type: Date, default: new Date() },
});

const queryModel = mongoose.model("query", mySchema);

module.exports = queryModel;