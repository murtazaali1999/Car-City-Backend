const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
  email: {
    type: String,
  },

  password: {
    type: String,
  },

  companyid: {
    //to which company a owner has
    type: mongoose.Types.ObjectId,
    ref: "Company",
    default: null,
  },

  approval: {
    type: Boolean,
    default: false,
  }, //means that can he create car/make posts/create showroom
});

global.Owner = global.Owner || mongoose.model("Owner", OwnerSchema);
module.exports = global.Owner;
