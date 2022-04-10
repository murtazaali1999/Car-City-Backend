const mongoose = require("mongoose");
const epxress = require("express");
const { response } = require("express");
const router = epxress.Router();

//signup
//signin

const Customer = mongoose.model("Customer");

router.post("/customer/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("one or more fields are empty", false);
  }

  let check1 = false;
  const checkCustomer = await Customer.find({});
  checkCustomer.map((customer) => {
    if (customer.email == email) {
      check1 = true;
    }
  });

  if (check1 == true) {
    return res
      .status(400)
      .send("customer already exists with this email", false);
  }

  return res.status(200).send("signed up successfully", true);
});

router.post("/customer/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("one or more fields are empty", false);
  }

  let check1 = false;
  const checkCustomer = await Customer.find({});

  checkCustomer.map((customer) => {
    if (customer.email == email && customer.password == password) {
      check1 = true;
    }
  });

  if (check1 == false) {
    return res.status(400).send("entered credentials are not correct", false);
  }

  return res.status(200).send("signed in successfully", true);
});

router.get("/customer/getsinglecustomer/:u_id", async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.u_id })
      .catch((err) => { return res.status(400).json({ message: err }) })

    if (!customer || customer == {})
      return res.status(400).json({ message: "Customer does not exist" });

    return res.status(200).json({ message: customer });
  } catch (err) { console.log(err) }
})

module.exports = router;
