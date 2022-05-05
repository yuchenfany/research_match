// npx jest --coverage --forceExit -- server.test.js
import { test, expect, beforeEach } from '@jest/globals';

const request = require('supertest');
const { MongoClient } = require('mongodb');
const webapp = require('./server');

const connect = async () => {
  (await MongoClient.connect(
    process.env.ATLAS_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )).db();
};

beforeEach(async () => {
  await connect();
  webapp.listen();
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

/* **** USER ENDPOINTS **** */
test('/login: null 401', () => request(webapp).post('/login')
  .send({ username: null }).expect(401)
  .then((response) => {
    expect(JSON.parse(response.text).err).toEqual(true);
    expect(JSON.parse(response.text).msg).toEqual('Not valid login.');
  }));

test('/login: not exists 401', () => request(webapp).post('/login')
  .send({ username: 'fakeuser', password: 'fakepass' }).expect(401)
  .then((response) => {
    // console.log(response);
    expect(JSON.parse(response.text).err).toEqual(true);
    expect(JSON.parse(response.text).msg).toEqual('Your username/password combination does not match.');
  }));

test('/login: invalid password 401', () => request(webapp).post('/login')
  .send({ username: 'tester3', password: 'wrongpass' }).expect(401)
  .then((response) => {
    expect(JSON.parse(response.text).err).toEqual(true);
    expect(JSON.parse(response.text).msg).toEqual('Your username/password combination does not match.');
  }));

// test('/record/add', () => request(webapp).post('/record/add')
//   .send(testUser).expect(200)
//   .then((response) => {
//     expect(JSON.parse(response.text).err).toBeFalsy();
//   }));

// test('/record/add-researcher', () => request(webapp).post('/record/add-researcher')
//   .send(testResearcher).expect(200)
//   .then((response) => {
//     expect(JSON.parse(response.text).err).toBeFalsy();
//   }));

test('/record/:id: get user', () => request(webapp).get('/record/test')
  .expect(200)
  .then((response) => {
    expect(JSON.parse(response.text).result).toMatchObject(testUser);
  }));

test('/record/:id: get researcher', () => request(webapp).get('/record/rtest')
  .expect(200)
  .then((response) => {
    expect(JSON.parse(response.text).result).toMatchObject(testResearcher);
  }));

test('/record/:id: nonexistent', () => request(webapp).get('/record/fakeuser')
  .expect(200)); // ?

test('/record/delete/:id: nonexistent', () => request(webapp).get('/record/delete/fakeuser')
  .expect(404));

test('/record/delete/:id: user', () => request(webapp).delete('/record/delete/test')
  .expect(200)
  .then((response) => {
    expect(JSON.parse(response.text).result).toBeUndefined();
  }));

test('/record/delete/:id: researcher', () => request(webapp).delete('/record/delete/rtest')
  .expect(200)
  .then((response) => {
    expect(JSON.parse(response.text).result).toBeUndefined();
  }));

/* **** STUDY ENDPOINTS **** */

/* **** CHAT ENDPOINTS **** */
