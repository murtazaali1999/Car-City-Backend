const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  ownerid: {
    type: mongoose.Types.ObjectId,
    ref: "Owner",
  },

  company_name: {
    type: String,
  },

  showroomid: [
    //list of showroom a company has
    {
      type: mongoose.Types.ObjectId,
      ref: "ShowRoom",
    },
  ],

  showroom_count: { type: Number }
});

global.Company = global.Company || mongoose.model("Company", CompanySchema);
module.exports = global.Company;
