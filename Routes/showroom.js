const mongoose = require("mongoose");
const epxress = require("express");
const { route } = require("express/lib/router");
const router = epxress.Router();

const ShowRoom = mongoose.model("ShowRoom");
const Company = mongoose.model("Company");
//display those showrooms whose status is approved
/*  
/put/createshowroom/:c_id ==> Works
/get/allshowroom ==> Works
/get/allshowroomcars/:s_id

/get/singleshowroom/:s_id ==> Works
/put/updateshowroom/:s_id ==> Works
*/

//c_id is company-id
router.put("/put/createshowroom/:c_id", async (req, res) => {
  const {
    showroom_address,
    showroom_image,
    phone_number,
    opening_time,
    closing_time,
  } = req.body;

  if (
    !showroom_address ||
    !showroom_image ||
    !phone_number ||
    !opening_time ||
    !closing_time
  ) {
    return res.status(400).json({ message: "one or more fields are empty" });
  }
  try {
    const company = await Company.findOne({ _id: req.params.c_id }).select(
      "company_name ownerid showroomid"
    );

    const showrooms = await ShowRoom.find({});

    let check1 = false;
    showrooms.map((showroom) => {
      if (showroom.showroom_address == showroom_address) {
        check1 = true;
      }
    });

    if (check1 == true) {
      return res
        .status(400)
        .json({ message: "showroom already exists, change its address" });
    }

    const newShowRoom = new ShowRoom({
      showroom_address,
      showroom_image,
      phone_number,
      opening_time,
      closing_time,
      companyId: company._id,
    });

    company.showroomid.push(newShowRoom._id);

    await newShowRoom.save().catch((err) => {
      return console.log(err.message);
    });

    await company
      .save()
      .then(() => {
        console.log("company updated with showroom");
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(200).json({ message: "error in saving showroom" });
      });

    res.status(200).json({ message: "Showroom Created Succesfully" });
    /* 
    console.log("ShowRoom", newShowRoom);
    console.log("Company", company); */
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get/allshowroom", async (req, res) => {
  try {
    await ShowRoom.find({}).exec((err, showrooms) => {
      if (!err) {
        if (showrooms.length == 0 || !showrooms || showrooms == []) {
          return res.status(400).json({ message: "no showrooms exist" });
        }
        res.status(200).json({ message: showrooms });
      } else {
        console.log(err.message);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});

//s_id is showroom id
router.get("/get/allshowroomcars/:s_id", async (req, res) => {
  //populate to get posts then cars
  try {
    await ShowRoom.find({ _id: req.params.s_id })
      .populate("postid carid")
      .exec((err, showroom) => {
        if (!err) {
          if (!showroom || showroom == null || showroom == undefined) {
            return res.status(400).json({ message: "show-rooms do not exist" });
          } else {
            const cars = showroom.carid.map((car) => {
              return car;
            });
            return res.status(200).json({ message: cars });
          }
        } else {
          console.log(err.message);
        }
      });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get/singleshowroom/:s_id", async (req, res) => {
  try {
    const showroom = await ShowRoom.find({ _id: req.params.s_id })
      .populate("companyId")
      .catch((err) => console.log(err));
    if (showroom.length == 0 || !showroom || showroom == []) {
      return res.status(400).json({
        message: "no showroom exists with this id or no showroom exists",
      });
    }

    return res.status(200).json({ message: showroom });
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/put/updateshowroom/:s_id", async (req, res) => {
  const {
    showroom_address,
    showroom_image,
    phone_number,
    opening_time,
    closing_time,
  } = req.body;

  try {
    const showroom = await ShowRoom.findOne({ _id: req.params.s_id }).catch(
      (err) => {
        return console.log(err);
      }
    );

    if (showroom.length == 0 || !showroom || showroom == []) {
      return res.status(400).json({
        message: "no showroom exists with this id or no showroom exists",
      });
    }

    showroom.showroom_address = showroom_address;
    showroom.showroom_image = showroom_image;
    showroom.phone_number = phone_number;
    showroom.opening_time = opening_time;
    showroom.closing_time = closing_time;

    await showroom
      .save()
      .then(() => console.log("ShowRoom Updated Succesfully"))
      .catch((err) => console.log(err));

    return res.status(200).json({ message: showroom });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
