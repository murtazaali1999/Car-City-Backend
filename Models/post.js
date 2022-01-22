const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  post_date: {
    //self generated
    type: Number,
    default: Date.now(),
  },

  post_type: {
    //rent or sale
    type: String,
  },

  carid: {
    //this will fetch all of the cars information
    type: mongoose.Types.ObjectId,
    ref: "Car",
  },
});

global.Post = global.Post || mongoose.model("Post", PostSchema);
module.exports = global.Post;
