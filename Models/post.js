const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  car_name: {
    type: String,
  },

  car_model: {
    type: String,
  },

  post_date: {
    //self generated
    type: String,
  },

  post_type: {
    //rent or sale
    type: String,
  },

  registered_in: {
    //Lahore or Karachi etc
    type: String,
  },

  price: {
    //for rent or for rent
    type: Number,
  },

  fuel_avg: {
    type: Number,
  },

  seats: {
    type: Number,
  },

  bags: {
    type: String,
    //1 large bag / 3 small bags etc
  },

  assembly: {
    //local or imported
    type: String,
  },

  body_type: {
    //SUV/
    type: String,
  },

  color: {
    type: String,
  },

  engine_type: {
    type: String,
  },

  transmission: {
    //auto or manual
    type: String,
  },

  car_produced: {
    //in which year it was produced
    type: Number,
  },

  car_image: [
    {
      //revaluate later when on netlify
      type: String,
    },
  ],

  discription: {
    //discription of the car
    type: String,
    default: "...",
  },

  features: {
    type: String,
    //checkbox for features, fan
  },

  car_milage: {
    //milage of a car
    type: Number,
  },

  ownerid:
    //to which showroom owner it belongs too
    {
      type: mongoose.Types.ObjectId,
      ref: "Owner",
    },

  showroom: {
    //to which shoroom it belongs too
    type: mongoose.Types.ObjectId,
    ref: "ShowRoom",
  },
});

global.Post = global.Post || mongoose.model("Post", PostSchema);
module.exports = global.Post;
