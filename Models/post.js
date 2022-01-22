const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  post_date: {
    //self generated
    type: Number,
    default: Date.now(),
  },

  post_type: {
    //make a drop down for this, Rent/Sale
    //rent or sale
    type: String,
  },

  carid: {
    //post can be of a single car
    type: mongoose.Types.ObjectId,
    ref: "Car",
  },
});

global.Post = global.Post || mongoose.model("Post", PostSchema);
module.exports = global.Post;
