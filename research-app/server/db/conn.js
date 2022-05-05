const { MongoClient } = require('mongodb');

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// eslint-disable-next-line no-underscore-dangle
let _db;

module.exports = {
  connectToServer(callback) {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('research-app');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb() {
    return _db;
  },
};
