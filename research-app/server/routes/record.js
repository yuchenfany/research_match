const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.post('/login', (req, res) => {

  var username = req.body.username;

  if (!username) {
    return res.status(401).json({'err':true, 'msg':'Not valid login.'});
  }
  let db_connect = dbo.getDb("research-app");
  db_connect
    .collection("user-info")
    .findOne({username : username}, (err, usr) => {
      if (err) {
        console.log(err);
        if (err == "No such user")
          return res.status(401).json({'err':true, 'msg':'Your username/password combination does not match.'});
        return res.status(500).json({'err':true, 'msg': 'There was an internal server error.'}) 
      }
      // var password = auth.hash(req.body.password);
      if (usr.password !== password) {
        return res.status(401).json({'err':true, 'msg':'Your username/password combination does not match.'});
      }  
      req.session.user = usr;
      req.session.save(() => res.json({'msg':'Logged in!','user':usr}))
      io.sockets.emit("newLogin", {user: username});
    })
  })
// This section will help you get a list of all the records.
recordRoutes.route("/findPassword").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  let myobj = {
    username: req.body.username,
    password: req.body.password,
  };
  db_connect
    .collection("user-info")
    .findOne({username : username})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  db_connect
    .collection("user-info")
    .findOne({username : req.username}, function (err, result) {
      if (err) throw err;
      res.json(result);
    }
    )
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  console.log(req.params.id);
  let myquery = { username: req.params.id};
  db_connect
      .collection("user-info")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
  };
  db_connect.collection("user-info").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { username: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      username: req.body.username,
      password: req.body.password,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;