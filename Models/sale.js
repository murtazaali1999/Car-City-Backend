const mongoose = require("mongoose");

const SaleSchema = mongoose.Schema({
  //model for when was the car sold

  customerid: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },

  carid: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
  },

  time: {
    //time at which the car was bought
    type: Number,
    default: Date.now(),
  },
});

global.Sale = global.Sale || mongoose.model("Sale", SaleSchema);
module.exports = global.Sale;
