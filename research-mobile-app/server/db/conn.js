const { MongoClient } = require('mongodb');

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mdb;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db) {
        mdb = db.db('research-app');
      }
      return callback(err);
    });
  },

  getDb: () => mdb,
};

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("research-app");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//          });
//   },

//   getDb: function () {
//     return _db;
//   },
// };
