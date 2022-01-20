const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
//const sendEmail = require("./utils/sendEmail"); //for generating mails
const { MONGOURI } = require("./Keys/keys");

const app = express();
app.use(express.json({ limit: "50mb" })); //to parse outgoing json in the post req
const serverPort = 1949;

//models registering
//require("./postModel");

//routes registering
//const post = require("./Routes/post");

//app.use([]); //insert routes here

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
