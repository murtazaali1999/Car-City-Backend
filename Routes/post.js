const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();

//create post //
//display all posts //
//posts by type //
//posts by car preferences
//update post
//delete post

/* 
/post/createpost/:showroomid ==> Works
/get/allposts ==> Works
/get/postbytype/:type ==> Works
/get/postbyid/:pst_id ==> Works //same to below
/get/getsinglepost/:p_id ==> Works
/put/updatepost/:p_id ==> Works

/get/postbypreferences ==>
 */

const Post = mongoose.model("Post");
const Car = mongoose.model("Car");
const ShowRoom = mongoose.model("ShowRoom");

router.post("/post/createpost/:showroomid", async (req, res) => {
  const {
    car_name,
    car_model,
    registered_in,
    number_plate,
    sale_price,
    rent_price,
    fuel_avg,
    seats,
    bags,
    assembly,
    body_type,
    color,
    engine_type,
    transmission,
    car_produced,
    car_image,
    discription,
    features,
    car_milage, //above all for car
    post_type, //for post creation
  } = req.body;

  if (
    !car_name ||
    !car_model ||
    !registered_in ||
    !number_plate ||
    !sale_price ||
    !rent_price ||
    !fuel_avg ||
    !seats ||
    !bags ||
    !assembly ||
    !body_type ||
    !color ||
    !engine_type ||
    !transmission ||
    !car_produced ||
    !car_image ||
    !discription ||
    !features ||
    !car_milage ||
    !post_type ||
    !req.params.showroomid
  ) {
    return res.status(400).json({ message: "one or more fields are emptys" });
  }

  try {
    const cars = await Car.find({}).catch((err) => {
      console.log(err);
    });

    let check1 = false; //check if name is same
    cars.map((post) => {
      if (post.car_name == car_name) {
        check1 = true;
      }
    });

    if (check1 == true) {
      return res.status(400).json({ message: "this car already exists" });
    }

    const newCar = new Car({
      car_name,
      car_model,
      registered_in,
      number_plate,
      sale_price,
      rent_price,
      fuel_avg,
      seats,
      bags,
      assembly,
      body_type,
      color,
      engine_type,
      transmission,
      car_produced,
      car_image,
      discription,
      features,
      car_milage,
      showroomid: req.params.showroomid, //above all for car
    });

    await newCar
      .save()
      .then(() => {
        console.log("Car Saved Successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    const newPost = await Post.create({ post_type, carid: newCar._id }).catch(
      (err) => {
        console.log(err);
      }
    );

    await ShowRoom.findOneAndUpdate(
      { _id: req.params.showroomid },
      { $push: { postid: newPost } }
    );
    /*     console.log("New-Post==>", newPost);
     */

    res.status(200).json({ Post: newPost, message: "Car Posted Successfully to Showroom" });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get/allposts", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("carid")
      .catch((err) => {
        return console.log(err);
      });
    if (posts == null || !posts || posts == [] || posts == undefined) {
      return res.status(400).send("no posts exist", false);
    }

    return res.status(200).json({ message: posts });
  } catch (err) {
    console.log(err);
  }
});

//either for buying or renting
router.get("/get/postbytype/:type", async (req, res) => {
  try {
    const posts = await Post.find({ post_type: req.params.type }).catch(
      (err) => {
        console.log(err);
        return res
          .status(400)
          .json({ message: "there was an error finding posts" });
      }
    );
    if (posts == null || !posts || posts == [] || posts == undefined) {
      return res.status(400).json({ message: "no posts exist" });
    }

    return res.status(200).json({ message: posts });
  } catch (err) {
    console.log(err);
  }
});

//search by preferences
router.get("/get/postbypreferences", async (req, res) => {
  let userPattern = new RegExp("^" + req.query);
  const posts = await Post.find({}).populate("carid");
  posts.map((post) => { }); ///
  console.log("query result=>", await Post.find({ userPattern }));
});

router.get("/get/postbyid/:pst_id", async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.pst_id })
      .populate("carid")
      .exec((err, post) => {
        if (!err) {
          if (post == [] || post == null || post == undefined || !post) {
            console.log("There are currently no posts available");
          } else {
            return res.status(200).json({ message: post });
          }
        } else {
          console.log(err);
        }
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get/getsinglepost/:p_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.p_id })
      .populate("carid")
      .catch((err) => {
        return console.log(err);
      });

    if (post == null || !post || post == [] || post.length == 0) {
      return res.status(400).send("Post does'nt exist with this ID", false);
    }

    return res.status(200).json({ message: post });
  } catch (err) {
    console.log(err);
  }
});

router.put("/put/updatepost/:p_id", async (req, res) => {
  const { post_type } = req.body;

  try {
    const post = await Post.findOne({ _id: req.params.p_id })
      .populate("carid")
      .catch((err) => {
        return console.log(err.message);
      });

    if (post == null || !post || post == [] || post.length == 0) {
      return res
        .status(400)
        .json({ message: "Post does'nt exist with this ID" });
    }

    post.post_type = post_type;

    await post
      .save()
      .then(() => {
        console.log("Post Updated Sucessfull");
      })
      .catch((err) => console.log(err.message));

    return res.status(200).json({ message: post });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
