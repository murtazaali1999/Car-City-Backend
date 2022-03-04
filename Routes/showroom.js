const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const ShowRoom = mongoose.model("ShowRoom");
const Company = mongoose.model("Company");
//display those showrooms whose status is approved
/*  */

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

  const company = await Company({ _id: req.params.c_id }).select(
    "company_name ownerid showroomid"
  );

  const newShowRoom = new ShowRoom({
    showroom_address,
    showroom_image,
    phone_number,
    opening_time,
    closing_time,
    companyId: company._id,
  });

  company.showroomid.push(newShowRoom._id);

  newShowRoom.opening_time = new Date(opening_time);
  newShowRoom.closing_time = new Date(closing_time);

  /* await ShowRoom.create({
    showroom_address,
    showroom_image,
    phone_number,
    opening_time,
    closing_time,
    companyId: company._id,
  });

  await company.save().then(() => {
    console.log("company updated with showroom");
  }); */

  console.log("ShowRoom", newShowRoom);
  console.log("Company", company);
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

module.exports = router;
