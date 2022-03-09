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
  const car = await Car.findOne({ _id: req.params.c_id });
  const customer = await Customer.findOne({ _id: req.params.cst_id });

  const newSale = new Sale({
    carid: car._id,
    customerid: customer._id,
  });

  newSale
    .save()
    .then(() => console.log("Car sold Sucessfully"))
    .catch((err) => console.log(err));

  await Car.deleteOne({ _id: car._id })
    .then(() => console.log("Car Sold"))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
