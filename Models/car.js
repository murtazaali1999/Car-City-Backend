const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({});

global.Book = global.Book || mongoose.model("Book", BookSchema);
module.exports = global.Book;
