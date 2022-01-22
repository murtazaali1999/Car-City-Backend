const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  companyid: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  },
});

global.Owner = global.Owner || mongoose.model("Owner", OwnerSchema);
module.exports = global.Owner;
