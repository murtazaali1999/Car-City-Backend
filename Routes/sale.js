const mongoose = require("mongoose");
const epxress = require("express");
const { route } = require("./post");
const router = epxress.Router();

const Customer = mongoose.model("Customer");
const Car = mongoose.model("Car");
const Sale = mongoose.model("Sale");
const Post = mongoose.model("Post");

/* 
c_id => car id
cst_id => customer id
/buycar/:c_id 

*/

router.post("/buycar/:cst_id/:c_id", async (req, res) => {
  try {
    if (!req.params.c_id || req.params.cst_id)
      return res.status(400).json({ error: "One or More fields are empty" });

    const newSale = new Sale({
      carid: req.params.c_id,
      customerid: req.params.cst_id,
    });

    newSale
      .save()
      .then(() => console.log("Car sold Sucessfully"))
      .catch((err) => console.log(err));

  } catch (errs) {
    return res.status(400).json({ error: err })
  }
});

module.exports = router;
