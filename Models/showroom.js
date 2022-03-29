const mongoose = require("mongoose");

const ShowRoomSchema = mongoose.Schema({
  //owner has multiple showrooms
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
  },

  postid: [
    //showroom can have multiple posts
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      defaut: [],
    },
  ],

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
    //use new Date(put date here)
    type: String,
  },

  closing_time: {
    //use new Date(put date here)
    type: String,
  },
});

global.ShowRoom = global.ShowRoom || mongoose.model("ShowRoom", ShowRoomSchema);
module.exports = global.ShowRoom;
