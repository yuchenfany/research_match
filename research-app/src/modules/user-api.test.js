/* eslint-disable */ 
// https://www.npmjs.com/package/jest-fetch-mock

import api from './chat-api';
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';
import { enableFetchMocks } from 'jest-fetch-mock'

import {test, expect, beforeAll} from '@jest/globals';
import data from '../assets/questions.json';

let mock;

beforeAll(() => {
    require('jest-fetch-mock').enableMocks()
});



/*
* LOGIN TESTS
*/

// input: 'player', output {player:0}
test('login new player', async () => {
  // mock the axios response - new user 201
  mock.onPost('/login').reply(201, { player: 0 });
  const response = await api.loginUser({username: 'player'});
  expect(response).toMatchObject({player: 0});
});

// input: 'player', output {serena:0}
test('login existing player', async () => {
  // mock the axios response - existing user 200
  mock.onPost("/login").reply(200, { player: 5});
  const response = await api.loginUser({ username: 'player' });
  expect(response).toMatchObject({player: 5});
});

// input: '', output error
test('login empty', async () => {
  mock.onGet("/login").reply(200, {player: 5});
  try {
    await api.loginUser({username: ''});
  } catch (e) {
    expect(e).toMatchObject(new Error('invalid username'));
  }
  return 'fail';
});

// input: , output error
test('login null', async () => {
  mock.onGet("/login").reply(200, {player: 5});
  try {
    await api.loginUser(null);
  } catch (e) {
    expect(e).toMatchObject(new Error('invalid username'));
  }
  return 'fail';
});


/*
* DELETE TESTS
*/

// player exists
test('delete existing player', async () => {
  mock.onDelete("/delete/player").reply(200);
  const response = await api.deleteUser("player");
  expect(response).toBeUndefined();
});

// player doesn't exist
test('delete nonexistant player2', async () => {
  mock.onDelete("/delete/player2").reply(404);
  try {
    await api.deleteUser("player2");
  } catch (e) {
    return 'success';
  }
  return 'fail';
});

// empty delete
test('delete invalid', async () => {
  mock.onDelete("/delete/").reply(400);
  try {
    await api.deleteUser("");
  } catch (e) {
    return 'success';
  }
  return 'fail';
});


/*
* UPDATE SCORE TESTS
*/

// player exists
test('update existing player', async () => {
  mock.onPut("/update/player").reply(200);
  const response = await api.updateScore({username: "player", highscore: 9});
  expect(response).toBeUndefined();
});

// player doesn't exist
test('update nonexistent player', async () => {
  mock.onPut("/update/player", {username: "player", highscore: 9}).reply(404);
  try {
    await api.updateScore("player", {username: "player", highscore: 9});
  } catch (e) {
    return 'success';
  }
  return 'fail';
});

// empty username
test('update empty username', async () => {
  mock.onPut("/update/", {username: "player", highscore: 9}).reply(400);
  try {
    await api.updateScore("player", {username: "player", highscore: 9});
  } catch (e) {
    return 'success';
  }
  return 'fail';
});

// empty body
test('update empty body', async () => {
  mock.onPut("/update/", {}).reply(400);
  try {
    await api.updateScore("player", {});
  } catch (e) {
    expect(e).toMatchObject(new Error('Invalid player'));
  }
  return 'fail';
});


/*
* GETUSERS TESTS
*/

// player exists
test('update existing player', async () => {
  mock.onGet("/users").reply(200, data);
  const response = await api.getUsers();
  expect(response.length).toBeLessThanOrEqual(10);
  expect(response.length).toBeGreaterThanOrEqual(10);
});


/*
* QUESTION TESTS
*/

// question 2
test('get question in range', async () => {
  // mock the axios response - valid question 200
  mock.onGet("/get_question/2").reply(200, data[2]);
  const response = await api.getQuestion(2);
  expect(response).toMatchObject(data[2]);
});