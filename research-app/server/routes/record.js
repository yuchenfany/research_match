const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.

/* USER ROUTES */
// Router controlling requests starting with path /record.
const recordRoutes = express.Router();

// Connect to DB
const dbo = require("../db/conn");

// Helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Login POST method
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
        if (err == "No such user") {
          return res.status(401).json({'err':true, 'msg':'Your username/password combination does not match.'});
        }
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

// Find password GET method
recordRoutes.route("/findPassword").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  db_connect
    .collection("user-info")
    .findOne({username : username})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get user GET method
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

// User GET by id method
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

// Add user POST method
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
    enrolled: []
  };
  db_connect.collection("user-info").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// get list of studies user is enrolled in
recordRoutes.route("/record/studies/:username").get(function (req, res) {
  let db_connect = dbo.getDb("research-app");
  db_connect
    .collection("user-info")
    .findOne({username : req.params.username}, function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    )
});

//TODO
// enroll in a study POST method 
recordRoutes.route("/record/enroll/:username/:study_id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.params.id,
  };
  db_connect.collection("studies").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update user info PUT method
// recordRoutes.route("/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { username: ObjectId( req.params.id )};
//   let newvalues = {
//     $set: {
//       username: req.body.username,
//       password: req.body.password,
//     },
//   };
//   db_connect
//     .collection("records")
//     .updateOne(myquery, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// Delete user DELETE method
// recordRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

module.exports = recordRoutes;
