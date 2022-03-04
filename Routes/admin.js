const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

//signin
//approve or reject showroom creation

const Admin = mongoose.model("Admin");
const ShowRoom = mongoose.model("ShowRoom");
const Owner = mongoose.model("Owner");
const Company = mongoose.model("Company");

/*
/admin/signin ==> 
/admin/approvalshowroom/:sh_id ==>  ==> approves showroom
/admin/approveowner/:o_id ==>  ==> approves owner
/admin/rejectowner/:o_id ==>  ==> rejects owner(deletes owner)
 */

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
{
  /* 
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

router.put("/admin/rejectshowroom/:sh_id", async (req, res) => {
  try {
    //delete showroom
    //delete link in company
    await ShowRoom.deleteOne({ _id: req.params.sh_id })
      .then(() => {
        console.log("Showroom rejected successfully");
      })
      .catch((err) => console.log(err.message));

    const companys = await Company.find({});

    companys.map((company) => {
      //iterate company
      company.showroomid.map(async (showroom) => {
        //iterate company=>showroom
        if (showroom._id == req.params.sh_id) {
          company.showroomid = null;
          await company
            .save()
            .then(() => console.log("Removed showroom from company"))
            .catch((err) => console.log(err.message));
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});
 */
} //approve and reject showroom

//o_id ===> Owner Object Id
router.put("/admin/approveowner/:o_id", async (req, res) => {
  try {
    const owner = await Owner.findOne({ _id: req.params.o_id });
    owner.approval = true;

    await owner.save().then(() => {
      console.log("Owner Approved Successfully");
    });
  } catch (err) {
    console.log(err.message);
  }
});

//o_id ===> Owner Object Id
router.put("/admin/rejectowner/:o_id", async (req, res) => {
  try {
    await Owner.deleteOne({ _id: req.params.o_id }).catch((err) =>
      console.log(err)
    );
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
