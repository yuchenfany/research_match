const express = require("express");

/* STUDIES ROUTES */
// Router controlling requests starting with path /study.
const studyRoutes = express.Router();
const dbo = require("../db/conn");

// get individual study by id
studyRoutes.route("/study/:id").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  const myquery = { studyId: parseInt(req.params.id) };
  db_connect
      .collection("studies")
      .findOne(myquery, function (err, result) {
        if (err) {
          throw err;
        }
        res.json(result);
      });
});

// get list of all studies
studyRoutes.route("/study").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  
  db_connect
    .collection("studies")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = studyRoutes; 
