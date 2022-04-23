const mongoose = require("mongoose");
const epxress = require("express");
const router = epxress.Router();



const Book = mongoose.model("Book");
//book/rent car

router.post("/bookcar/:c_id", async (req, res) => {
    const { cr_id, startTime, endTime } = req.body;

    if (!cr_id) return res.status(400).json({ message: "one or more fields are empty" });
    if (Date.now(startTime) < Date.now()
        || Date.now(endTime) < Date.now(startTime)
        || Date.now(startTime) < Date.now(endTime)) {
        return res.status(400).json({ message: "Start-End Time Issue,Correct Booking Time Sets" });
    }

    const newBooking = ({
        customerid: req.params.c_id,
        carid: cr_id,
        startTime,
        endTime
    });

    newBooking.save().then(() => {
        return res.status(400).json({ message: "Booking Made Successfully" })
    }).catch((err) => {
        return res.status(400).json({ error: err })
    });

});

module.exports = router;
