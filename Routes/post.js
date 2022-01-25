const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

//display all posts
//posts by type
//posts by car specification
//post in this week

const Post = mongoose.model("Post");

router.get("/allposts", async (req, res) => {
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
router.get("/postbytype/:type", async (req, res) => {
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

//search by form
router.get("/getpostbycarspecification", async (req, res) => {
  //if none then search all posts
  //if one then that one

  const {
    car_name,
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

  const posts = await Post.find({ car_name: car_name });
});

router.get("/getrecentpost", async (req, res) => {});

module.exports = router;
