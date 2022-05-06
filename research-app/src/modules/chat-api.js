import config from '../config.json';

// Gets all the messages the user has set or received
async function getMessages(sender, receiverName) {
  const userField = sender.type === 0 ? sender.username : receiverName;
  const researcher = sender.type === 1 ? sender.username : receiverName;
  const data = await fetch(`http://${config.server_host}/chats/get/${userField}/${researcher}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json?.messages ?? []; // returns messages array
}

// Gets number of messages that user has received
async function getNumMessages(sender) {
  const data = await fetch(`http://${config.server_host}/chats/getNumMessages/${sender.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  const messageCounts = !json || (json?.length ?? 0) === 0 ? [{ messages: 0 }] : json;
  return messageCounts[0]?.messages;
}

async function updateNumberOfMessages(sender, setSender, setNotification, user, setUser) {
  const newNumMessages = await getNumMessages(sender);
  if (sender.messages === newNumMessages) {
    setNotification(false);
    return;
  }
  const updatedUser = JSON.parse(JSON.stringify(user));
  updatedUser.messages = await newNumMessages;
  await setSender(updatedUser);
  await setNotification(false);
  await setUser(updatedUser);
  await fetch(`http://${config.server_host}/record/updateMessages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
}

async function getChats(user) {
  const allChats = await fetch(
    `http://${config.server_host}/chats?senderName=${user.username}&senderType=${user.type}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await allChats.json();
  return data;
}

async function getNumMessagesSent(user) {
  const data = await fetch(`http://${config.server_host}/chats/getNumMessagesSent/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  const messageCounts = json ?? [{ messages: 0 }];
  return messageCounts[0]?.messages;
}

export {
  getMessages, getNumMessages, updateNumberOfMessages, getChats, getNumMessagesSent,
};
