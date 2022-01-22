const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  car_name: {
    type: String,
  },

  car_model: {
    type: String,
  },

  registered_in: {
    //Lahore or Karachi etc
    type: String,
  },

  number_plate: {
    //can be used if owner tries to upload the same car that was sold or rented already
    type: Number,
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

  showroom: {
    //to which showroom it belongs too
    type: mongoose.Types.ObjectId,
    ref: "ShowRoom",
  },

  postid: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  }, //a car can belong one post
});

global.Car = global.Car || mongoose.model("Car", CarSchema);
module.exports = global.Car;
