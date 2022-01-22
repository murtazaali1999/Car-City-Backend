const mongoose = require("mongoose");

const customer_Schema = mongoose.Schema({
  //customer is the person who is going to buy or rent a car
  email: {
    type: String,
  },

  password: {
    type: String,
  },

  address: {
    type: String,
  },

  phonenumber: {
    type: Number,
  },
});

global.Customer =
  global.Customer || mongoose.model("Customer", customer_Schema);
module.exports = global.Customer;
