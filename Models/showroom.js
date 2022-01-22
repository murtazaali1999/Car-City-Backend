const mongoose = require("mongoose");

const ShowRoomSchema = mongoose.Schema({
  //owner has multiple showrooms
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  },

  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "Owner",
  },

  postid: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },

  carid: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
  },

  showroom_address: {
    type: String,
  },

  showroom_image: {
    //check its type during using netlify
    type: String,
  },

  phone_number: {
    type: Number,
  },

  opening_time: {
    type: Number,
  },

  closing_time: {
    type: Number,
  },

  status: {
    //if true then approved
    type: Boolean,
    default: false,
  },
});

global.ShowRoom = global.ShowRoom || mongoose.model("ShowRoom", ShowRoomSchema);
module.exports = global.ShowRoom;
