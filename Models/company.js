const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  company_name: {
    type: String,
  },

  showroomid: [
    //list of showroom a company has
    {
      type: mongoose.Types.ObjectId,
      ref: "Showroom",
    },
  ],

  carid: [
    //list of showroom a company has
    {
      type: mongoose.Types.ObjectId,
      ref: "Cars",
    },
  ],
});

global.Company = global.Company || mongoose.model("Company", CompanySchema);
module.exports = global.Company;
