const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  date: { type: String },
});
module.exports = mongoose.model("Notice", schema);
