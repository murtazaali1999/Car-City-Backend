const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const Owner = mongoose.model("Owner");
//signup
//signin
//adds showroom
//adds post
//update post
//delete post

/* 
/get/getallowner ==> Working ==> Returns all owners
 */

router.get("/get/getallowner", async (req, res) => {
  try {
    const owners = await Owner.find({}).catch((err) => console.log(err));
    res.status(200).json({ message: owners });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
