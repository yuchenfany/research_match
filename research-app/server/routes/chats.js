const express = require('express');

/* MESSAGE ROUTES */
// Router controlling requests starting with path /message.
const messageRoutes = express.Router();

// Connect to DB
const dbo = require('../db/conn');

/*
Objects:
  { user,
    researcher,
    messages: [{ sender, timestamp, text, attachment }]
  }

  Find each individual message chain: .find({user: user, researcher: researcher})
  Messages.js:
  Find all researchers a user has messages with: .find({user: user})
  Chat.js
  Pass in the messages field and display them in order
*/

// GET method: all chats that the user has
messageRoutes.route('/chats').get((req, res) => {
  const dbConnect = dbo.getDb();
  const { senderName, senderType } = req.query;

  let query;
  if (parseInt(senderType, 10) === 0) {
    query = { user: senderName };
  } else {
    query = { researcher: senderName };
  }

  dbConnect
    .collection('chats')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// GET method: get chat history
messageRoutes.route('/chats/get/:user/:researcher').get((req, res) => {
  const dbConnect = dbo.getDb();
  const { user, researcher } = req.params;
  const query = { researcher, user };

  dbConnect
    .collection('chats')
    .findOne(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// Send message POST method
messageRoutes.route('/chats/send').post((req) => {
  const dbConnect = dbo.getDb('research-app');
  const {
    sender, senderType, receiver, text,
  } = req.body;
  const user = senderType === 0 ? sender : receiver;
  const researcher = senderType === 1 ? sender : receiver;
  const message = { sender, timestamp: Date.now(), text };
  dbConnect
    .collection('chats')
    .updateOne(
      { user, researcher },
      { $push: { messages: message } },
      { upsert: true },
    );
});

messageRoutes.route('/chats/getNumMessages/:user').get((req, res) => {
  const dbConnect = dbo.getDb();
  const { user } = req.params;
  // const query = { user };
  // const numMessages = 0;
  // console.log(query);
  // dbConnect
  //   .collection('chats')
  //   .find(query)
  //   .toArray((err, result) => {
  //     // console.log(result);
  //     if (err) throw err;
  //     res.json(result);
  //     //for each chat in result:
  //     //numMessages = numMessages + req.
  //   });

  // if we want to move everything to the backend
  dbConnect
    .collection('chats')
    .aggregate([
      { $match: { $or: [{ user }, { researcher: user }] } },
      { $unwind: '$messages' },
      { $match: { sender: { $nin: [user] } } },
      { $count: 'messages' },
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = messageRoutes;
