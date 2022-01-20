const mongoose = require("mongoose");

const ShowRoomSchema = mongoose.Schema({
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
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

  timing: {
    type: Number,
  },
});

global.ShowRoom = global.ShowRoom || mongoose.model("ShowRoom", ShowRoomSchema);
module.exports = global.ShowRoom;
