const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

//display all posts //
//posts by type //
//posts by car preferences
//post in this week

const Post = mongoose.model("Post");

router.get("/get/allposts", async (req, res) => {
  try {
    const posts = await Post.find({}).catch((err) => {
      return console.log(err);
    });
    if (posts == null || !posts || posts == [] || posts == undefined) {
      return res.status(400).send("no posts exist", false);
    }

    return res.status(200).send(posts, true);
  } catch (err) {
    console.log(err);
  }
});

//either for buying or renting
router.get("/get/postbytype/:type", async (req, res) => {
  try {
    const posts = await Post.find({ post_type: req.params.type }).catch(
      (err) => {
        return console.log(err);
      }
    );
    if (posts == null || !posts || posts == [] || posts == undefined) {
      return res.status(400).send("no posts exist", false);
    }

    return res.status(200).send(posts, true);
  } catch (err) {
    console.log(err);
  }
});

//search by preferences
router.get("/get/postbypreferences", async (req, res) => {
  //if none then search all posts
  //if one then that one

  const {
    car_model,
    sale_price,
    rent_price,
    fuel_avg,
    seats,
    bags,
    assembly,
    body_type,
    transmission,
    car_produced,
  } = req.body;

  if (!car_name) return console.log("car name not entered");

  const posts = await Post.find({ car_name: car_name });
  if (posts == null || posts == [] || posts == undefined) {
    return res.status(400).send("car with this name does not exist", false);
  }

  return res.status(200).send(posts);
});

router.get("/get/test", async (req, res) => {
  const {
    car_model,
    sale_price,
    rent_price,
    fuel_avg,
    seats,
    bags,
    assembly,
    body_type,
    transmission,
    car_produced,
  } = req.body;

  console.log(req.body.sale_price);

  const query = await Car.find({
    car_model,
    sale_price,
    rent_price,
    fuel_avg,
    seats,
    bags,
    assembly,
    body_type,
    transmission,
    car_produced,
  });

  console.log(query);
});

router.get("/getrecentpost", async (req, res) => {});

module.exports = router;
