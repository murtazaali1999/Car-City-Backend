const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  postid: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  start_time: {
    type: Number,
  },

  end_time: {
    type: Number,
  },
});

global.Book = global.Book || mongoose.model("Book", BookSchema);
module.exports = global.Book;
