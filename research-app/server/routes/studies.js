const express = require('express');

/* STUDIES ROUTES */
// Router controlling requests starting with path /study.
const studyRoutes = express.Router();
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
studyRoutes.route('/study/enroll/:id').post((req) => {
  const dbConnect = dbo.getDb('research-app');
  const myobj = {
    id: req.params.id,
  };

  dbConnect.collection('user-info').update({ $addToSet: { enrolled: myobj } });
});

module.exports = studyRoutes;
