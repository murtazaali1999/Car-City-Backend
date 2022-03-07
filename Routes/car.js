const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const Car = mongoose.model("Car");
const ShowRoom = mongoose.model("ShowRoom");

router.get("/get/allcars", async (req, res) => {
  return await Car.find({}).catch((err) => console.log(err));
});

router.get("/get/carsbyshowroom/:s_id", async (req, res) => {
  try {
    const showRoom = await ShowRoom.findOne({ _id: req.params.s_id }).catch(
      (err) => {
        console.log(err);
        return res
          .status(400)
          .json({ message: "There was an error finding Showroom" });
      }
    );
    const carList = [];
    showRoom.postid.map((post) => {
      carList.push(post.carid);
    });

    return res.status(200).json({ message: carList });
    //returns list of objects
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Couldn't find car" });
  }
});

module.exports = router;
