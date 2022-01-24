const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

//signin
//approve or reject showroom creation

const Admin = mongoose.model("Admin");
const ShowRoom = mongoose.model("ShowRoom");

router.post("/admin/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("one or more fields are empty", false);
  }

  let check1 = false;
  const checkAdmin = await Admin.find({});
  checkAdmin.map((admin) => {
    if (admin.email == email && admin.password == password) {
      check1 = true;
    }
  });

  if (check1 == false) {
    return res.status(400).send("entered credentials are not correct", false);
  }

  return res.status(200).send("signed up successfully", true);
});

router.put("/admin/approvalshowroom/:sh_id", async (req, res) => {
  try {
    const findShowRoom = await ShowRoom.find({ _id: req.params.sh_id }).catch(
      (err) => {
        console.log(err);
      }
    );
    findShowRoom.status = true;
    await findShowRoom.save();
    return res.status(200).send("showroom is approved");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
