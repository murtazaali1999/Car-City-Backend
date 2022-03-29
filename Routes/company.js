const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

const Company = mongoose.model("Company");

/* 
/get/allcompanies ==> Works 
/get/singlecompany/:c_id ==> Works
/put/updatecompany/:c_id ==> Works
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

router.get("/get/singlecompany/:c_id", async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.c_id })
      .populate("ownerid showroomid")
      .catch((err) => {
        return console.log(err.message);
      });

    if (company == null || !company || company == [] || company.length == 0) {
      return res.status(400).json({ message: company });
    } else {
      return res.status(200).json({ message: company });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/put/updatecompany/:c_id", async (req, res) => {
  const { company_name } = req.body;

  if (!company_name) {
    return req.status(400).json({ message: "one field is empty" });
  }

  try {
    const company = await Company.findOne({ _id: req.params.c_id }).catch(
      (err) => {
        return console.log(err);
      }
    );
    if (company == null || !company || company == [] || company.length == 0) {
      return res.status(400).json({ message: company });
    }

    company.company_name = company_name;

    await company
      .save()
      .then(() => console.log("Company successfully saved"))
      .catch((err) => console.log(err.message));

    return res.status(200).json({ message: company });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
