const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  //model for car that was rented or booked temporarily
  customerid: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },

  carid: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
  },

  start_time: {
    //start time of car being rented
    type: Number,
  },

  end_time: {
    type: Number,
  },
});

global.Book = global.Book || mongoose.model("Book", BookSchema);
module.exports = global.Book;
