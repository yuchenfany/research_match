// import fetch from 'node-fetch';
import { test, expect, beforeEach } from '@jest/globals';
import api from '../modules/chat-api';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

const testUser = {
  username: 'test',
  password: 'testpass',
  enrolled: [],
  allergies: [],
  phys: ['diabetes'],
  psych: ['insomnia'],
  med: ['lexapro'],
  type: 0,
};

const testResearcher = {
  username: 'rtest',
  password: 'rtestpass',
  organization: 'Penn',
  studies: [2, 3, 5],
  type: 1,
};

const testChat = {
  user: 'test',
  researcher: 'rtest',
  messages: [
    {
      sender: 'test',
      timestamp: 1,
      text: 'Hi RTEST',
    },
    {
      sender: 'rtest',
      timestamp: 2,
      text: 'Hi TEST',
    },
    {
      sender: 'rtest',
      timestamp: 3,
      text: 'welcome to the STUDY',
    },
  ],
};

const dummy = () => true;

test('get user messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(testChat));
  const res = await api.getMessages(testUser, testResearcher.username);
  expect(res).toMatchObject(testChat.messages);
});

test('get researcher messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(testChat));
  const res = await api.getMessages(testResearcher, testUser.username);
  expect(res).toMatchObject(testChat.messages);
});

test('get number of user messages', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ messages: 3 }]));
  const res = await api.getNumMessages(testUser);
  expect(res).toEqual(3);
});

test('get number of researcher messages', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ messages: 3 }]));
  const res = await api.getNumMessages(testResearcher);
  expect(res).toEqual(3);
});

test('update number of user messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.updateNumberOfMessages(testUser, dummy, dummy, testUser, dummy);
  expect(res).toBeUndefined();
});

test('update number of researcher messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.updateNumberOfMessages(testResearcher, dummy, dummy, testResearcher, dummy);
  expect(res).toBeUndefined();
});

test('get user messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(testChat));
  const res = await api.getChats(testUser);
  expect(res).toMatchObject(testChat);
});

test('get researcher messages', async () => {
  fetch.mockResponseOnce(JSON.stringify(testChat));
  const res = await api.getChats(testResearcher);
  expect(res).toMatchObject(testChat);
});

test('get number of user messages sent', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ messages: 1 }]));
  const res = await api.getNumMessagesSent(testUser);
  expect(res).toEqual(1);
});

test('get number of researcher messages sent', async () => {
  fetch.mockResponseOnce(JSON.stringify([{ messages: 2 }]));
  const res = await api.getNumMessagesSent(testResearcher);
  expect(res).toEqual(2);
});
