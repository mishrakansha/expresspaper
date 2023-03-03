const mongoose = require("mongoose");

const ArticalsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    maxLength: 25,
  },
  discription: {
    type: String,
    required: true,
    maxLength: 25,
  },
  Markdown: {
    type: String,
    required: true,
  },
});

const Articals = mongoose.model("Articals", ArticalsSchema);

module.exports = Articals;
