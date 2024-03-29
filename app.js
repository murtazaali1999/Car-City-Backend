const express = require("express");
const mongoose = require("mongoose");
const { Mongoose } = require("mongoose");
//const sendEmail = require("./utils/sendEmail"); //for generating mails
const { MONGOURI } = require("./Keys/keys");
const cors = require("cors");

const app = express();
const serverPort = process.env.PORT || 1949;
const bodyparser = require("body-parser");

app.use(cors());
app.use(express.json({ limit: "50mb" })); //to parse outgoing json in the post req
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//models registering
require("./Models/admin");
require("./Models/book");
require("./Models/car");
require("./Models/company");
require("./Models/customer");
require("./Models/owner");
require("./Models/post");
require("./Models/sale");
require("./Models/showroom");

//routes registering
const signup = require("./Routes/signup");
const admin = require("./Routes/admin");
const book = require("./Routes/book");
const car = require("./Routes/car");
const company = require("./Routes/company");
const customer = require("./Routes/customer");
const owner = require("./Routes/owner");
const post = require("./Routes/post");
const sale = require("./Routes/sale");
const showroom = require("./Routes/showroom");

app.use([
  signup,
  admin,
  book,
  car,
  company,
  customer,
  owner,
  post,
  sale,
  showroom,
]);
//insert routes here

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //to remove deprecated warnings

/////MongoDB Connection Start///////

mongoose.connection.on("connected", () => {
  console.log("Successfully made a connection with MONGO");
});

mongoose.connection.on("error", (err) => {
  console.log("Failed to connect with MONGO", err);
  mongoose.connection.close();
});

mongoose.connection.on("exit", (err) => {
  console.log("Failed to connect with MONGO", err);
  mongoose.connection.close();
});

////MongoDB Connection End//////

app.get("/", (req, res) => {
  res.send("home");
});

const serverDebuger = require("debug")("app:server");
app.listen(serverPort, () => {
  serverDebuger(`connected to ${serverPort}`);
});
