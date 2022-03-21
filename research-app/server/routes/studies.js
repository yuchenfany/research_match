const express = require('express');

/* STUDIES ROUTES */
// Router controlling requests starting with path /study.
const studyRoutes = express.Router();
const { ObjectId } = require('mongodb').ObjectId;
const dbo = require('../db/conn');

// get individual study by id
studyRoutes.route('/study/:id').get((req, res) => {
  const dbConnect = dbo.getDb('research-app');
  const myquery = { studyId: parseInt(req.params.id, 10) };
  dbConnect
    .collection('studies')
    .findOne(myquery, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
});

// get list of all studies
studyRoutes.route('/study').get((req, res) => {
  const dbConnect = dbo.getDb('research-app');

  dbConnect
    .collection('studies')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// POST: add study to a user's enrolled array
studyRoutes.route('/study/:id').post((req, response) => {
  const dbConnect = dbo.getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      compensation: req.body.compensation,
      duration: req.body.duration,
      tags: req.body.tags,
      participants: req.body.participants,
      studyId: req.body.studyId,
      researchers: req.body.researchers,
    },
  };
  dbConnect
    .collection('studies')
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
  // dbConnect.collection('user-info').update({ $addToSet: { enrolled: myobj } });
});

module.exports = studyRoutes;
