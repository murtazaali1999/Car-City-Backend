const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const Car = mongoose.model("Car");

router.get("/get/allcars", async (req, res) => {
  return console.log(await Car.find({}).catch((err) => console.log(err)));
});

module.exports = router;
