const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const Company = mongoose.model("Company");

/* 
/get/allcompanies ==> Works 
*/

router.get("/get/allcompanies", async (req, res) => {
  try {
    await Company.find({}).exec((err, companies) => {
      if (!err) {
        if (companies.length == 0 || !companies || companies == []) {
          return res.status(400).json({ message: "no showrooms exist" });
        }
        res.status(200).json({ message: companies });
      } else {
        console.log(err.message);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
