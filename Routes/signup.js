const mongoose = require("mongoose");
const epxress = require("express");
const { response } = require("express");
const router = epxress.Router();

const Admin = mongoose.model("Admin");
const Customer = mongoose.model("Customer");
const Owner = mongoose.model("Owner");
const Company = mongoose.model("Company");

/* 
/post/signup/owner ==> signup owner ==> Works
/post/signup/customer ==> signup customer ==> Works
/get/signincustomer ==> signin customer ==> Works
/get/signinowner ==> signin owner ==> Works
/get/signinadmin ==> signin admin ==> Works
 */

//create owner/company
router.post("/post/signup/owner", async (req, res) => {
  const { email, password, company_name } = req.body;
  //save owner/company/showroom
  if (!email || !password || !company_name) {
    return res.status(400).json({ message: "one or more fields are empty" });
  }

  try {
    const owners = await Owner.find({}).catch((err) => {
      return console.log(err.message);
    });

    const company = await Company.findOne({ company_name }).catch((err) => {
      return console.log(err.message);
    });

    let check1 = false; //checks if owner exists
    owners.map((owner) => {
      if (owner.email == email || company_name == company?.company_name) {
        check1 = true;
      }
    });

    if (check1 == true) {
      return res.status(400).json({ message: "Owner  already exists" });
    }

    const newOwner = new Owner({
      email,
      password,
    });

    const newCompany = new Company({
      ownerid: newOwner._id,
      company_name,
    });

    newOwner.companyid = newCompany._id;
    /* 
    console.log("Owner==>", newOwner);
    console.log("Company==>", newCompany);
 */
    await Owner.create({
      email,
      password,
      companyid: newCompany._id,
    })
      .then(() => {
        console.log("Owner Saved Successfully");
      })
      .catch((err) => console.log(err.message));

    await Company.create({
      company_name,
      ownerid: newOwner._id,
    })
      .then(() => {
        console.log("Company Saved Successfully");
      })
      .catch((err) => console.log(err.message));

    return res
      .status(200)
      .json({ message: "Owner and Company successfully saved" });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/post/signup/customer", async (req, res) => {
  const { email, password, address, phonenumber } = req.body;

  try {
    if (!email || !password || !address || !phonenumber) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    let check1 = false; //checks if customer already exists
    const customers = await Customer.find({}).lean();
    customers.map((customer) => {
      if (customer.email === email || customer.phonenumber == phonenumber) {
        check1 = true;
        console.log("found");
      }
    });

    if (check1 == true) {
      console.log("true");
      return res.status(400).json({ message: "this customer already exists" });
    }

    const newCustomer = new Customer({
      email,
      password,
      address,
      phonenumber,
    });

    await newCustomer.save().catch((err) => {
      return console.log(err);
    });

    return res.status(200).json({ message: "Customer Signed Up Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get/signincustomer", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    const customers = await Customer.find({});

    let check1 = false; //checks if customer exists
    customers.map((customer) => {
      if (customer.email == email && customer.password == password) {
        check1 = true;
      }
    });

    if (check1 == false) {
      return res.status(400).json({ message: "customer does not exists" });
    }

    return res.status(200).json({ message: "customer signed in successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/signinowner", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    const owners = await Owner.find({});

    let check1 = false; //checks if customer exists
    owners.map((owner) => {
      if (owner.email == email && owner.password == password) {
        check1 = true;
      }
    });

    if (check1 == false) {
      return res.status(400).json({ message: "owner does not exists" });
    }

    return res.status(200).json({ message: "owner signed in successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/signinadmin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    const admin = await Admin.findOne({}).lean();

    console.log(admin.email == email, admin.password == password);
    if (admin.email == email && admin.password == password) {
      return res.status(200).json({ message: "admin signed in successfully" });
    }

    return res.status(400).json({ message: "email or password is incorrect" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
