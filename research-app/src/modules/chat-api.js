/* MESSAGING */
export async function getMessages(sender, receiverName) {
  const userField = sender.type === 0 ? sender.username : receiverName;
  const researcher = sender.type === 1 ? sender.username : receiverName;
  const data = await fetch(`http://localhost:5000/chats/get/${userField}/${researcher}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json?.messages ?? []; // returns messages array
}

// gets number of messages that user has received
export async function getNumMessages(sender) {
  const data = await fetch(`http://localhost:5000/chats/getNumMessages/${sender.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  const messageCounts = json ?? [0];
  return messageCounts[0]?.messages;
}

export async function updateNumberOfMessages(sender, setSender, setNotification, user, setUser) {
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
  await fetch('http://localhost:5000/record/updateMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
}

export async function getChats(user) {
  const allChats = await fetch(
    `http://localhost:5000/chats?senderName=${user.username}&senderType=${user.type}`,
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

export async function getNumMessagesSent(user) {
  const data = await fetch(`http://localhost:5000/chats/getNumMessagesSent/${user.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  const messageCounts = json ?? [{ messages: 0 }];
  return messageCounts[0]?.messages;
}

export default {
  getMessages, getNumMessages, updateNumberOfMessages, getChats,
};
