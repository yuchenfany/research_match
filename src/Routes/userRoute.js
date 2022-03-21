const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.route("/").get((req, res) => {
    console.log("correct being read to route")
    User.find().then(foundUsers => res.json(foundUsers))
})

module.exports = router;