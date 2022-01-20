const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  postid: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  sell_time: {
    //when was the car sold
    type: Number,
  },
});

global.Book = global.Book || mongoose.model("Book", BookSchema);
module.exports = global.Book;
