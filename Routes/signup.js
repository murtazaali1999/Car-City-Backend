const mongoose = require("mongoose");
const epxress = require("express");
const { response } = require("express");
const router = epxress.Router();

const Admin = mongoose.model("Admin");
const Customer = mongoose.model("Customer");
const Owner = mongoose.model("Owner");
const Company = mongoose.model("Company");

const sendEmail = require("../Utils/mail");

/* 
/post/signup/owner ==> signup owner ==> Works
/post/signup/customer ==> signup customer ==> Works
/get/signincustomer ==> signin customer ==> Works
/get/signinowner ==> signin owner ==> Works
/get/signinadmin ==> signin admin ==> Works
/put/forgotpassword/owner ==> reset token to user ==> Works
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

    const newCompany = new Company({
      company_name,
    });

    const newOwner = new Owner({
      email,
      password,
    });

    newOwner.companyid = newCompany._id;
    newCompany.ownerid = newOwner._id;

    await newOwner
      .save()
      .then(() => {
        console.log("Owner Saved Successfully");
      })
      .catch((err) => console.log(err.message));

    await newCompany
      .save()
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

router.post("/post/signincustomer", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    const customers = await Customer.find({});

    let check1 = false; //checks if customer exists
    let singleCustomer = {};
    customers.map((customer) => {
      if (customer.email == email && customer.password == password) {
        check1 = true;
        singleCustomer = customer;
        delete singleCustomer.password
      }
    });

    if (check1 == false) {
      return res.status(400).json({ message: "customer does not exists" });
    }

    return res.status(200).json({ customer: singleCustomer, message: "Logged In Sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/signinowner", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "one or more fields are empty" });
    }

    const owners = await Owner.find({});

    let check1 = false; //checks if customer exists
    let check2 = false;
    let singleOwner = null;
    owners.map((owner) => {
      if (owner.email == email && owner.password == password) {
        check1 = true;
        if (owner.approval == true) {
          singleOwner = owner;
          check2 = true;
        }
      }
    });

    if (check1 == false) {
      return res.status(400).json({ message: "owner does not exists" });
    } else if (check2 == false) {
      return res.status(400).json({ message: "this owner is not approved" });
    }

    singleOwner.password = null;
    singleOwner.reset_token = null;

    return res.status(200).json({ Owner: singleOwner, Message: "Logged In Sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/signinadmin", async (req, res) => {
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

router.put("/put/forgotpassword/owner", async (req, res) => {
  try {
    const { email } = req.body;
    const owner = await Owner.findOne({ email }).catch((err) => {
      return console.log(err.message);
    });

    if (owner == null || owner == [] || !owner || owner?.length == 0) {
      return res.status(400).json({ message: "this owner does not exist" });
    }
    owner.reset_token = Number(Math.floor(Math.random() * 9999) + 1000);
    console.log(owner.reset_token);
    await owner
      .save()
      .then(() => console.log("reset token saved successfully for owner"))
      .catch((err) => {
        return console.log(err.message);
      });

    await sendEmail({
      email: owner.email,
      subject: "Car City Reset Password",
      message: `This is an email from Car City,This is your ${owner.reset_token} reset token`,
    })
      .then(() => {
        console.log("Email Sent Successfully to Owner");
        res.status(200).json({
          message:
            "Email sent sucessfully, Check your email for the reset token",
        });
      })
      .catch((err) => console.log(err.message));
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/put/forgotpassword/customer", async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email }).catch((err) => {
      return console.log(err.message);
    });

    if (
      customer == null ||
      customer == [] ||
      !customer ||
      customer?.length == 0
    ) {
      return res.status(400).json({ message: "this owner does not exist" });
    }
    customer.reset_token = Number(Math.floor(Math.random() * 9999) + 1000);
    console.log(customer.reset_token);
    await customer
      .save()
      .then(() => console.log("reset token saved successfully for customer"))
      .catch((err) => {
        return console.log(err.message);
      });

    await sendEmail({
      email: customer.email,
      subject: "Car City Reset Password",
      message: `This is an email from Car City,This is your ${customer.reset_token} reset token`,
    })
      .then(() => {
        console.log("Email Sent Successfully to Customer");
        res.status(200).json({
          message:
            "Email sent sucessfully, Check your email for the reset token",
        });
      })
      .catch((err) => console.log(err.message));
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/put/reset/owner", async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!email || !password || !token) {
      res.status(400).json({
        message: "One or more fields are empty",
      });
    }
    const owner = await Owner.findOne({ email }).catch((err) => {
      return console.log(err.message);
    });

    if (owner == null || owner == [] || !owner) {
      return res.status(400).json({ message: "this owner does not exist" });
    }

    if (owner.reset_token != token) {
      return res
        .status(400)
        .json({ message: "the token entered is not correct" });
    }

    owner.password = password;
    owner.reset_token = null;

    await owner
      .save()
      .then(() => console.log("Owner Password Updated Successfully"))
      .catch((err) => {
        return console.log(err.message);
      });

    res.status(200).json({ message: "Owner Password Updated Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/put/reset/customer", async (req, res) => {
  try {
    const { email, password, token } = req.body;
    if (!email || !password || !token) {
      res.status(400).json({
        message: "One or more fields are empty",
      });
    }
    const customer = await Customer.findOne({ email }).catch((err) => {
      return console.log(err.message);
    });

    if (customer == null || customer == [] || !customer) {
      return res.status(400).json({ message: "this customer does not exist" });
    }

    if (customer.reset_token != token) {
      return res
        .status(400)
        .json({ message: "the token entered is not correct" });
    }

    customer.password = password;
    customer.reset_token = null;

    await customer
      .save()
      .then(() => console.log("Customer Password Updated Successfully"))
      .catch((err) => {
        return console.log(err.message);
      });

    res.status(200).json({ message: "Customer Password Updated Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
