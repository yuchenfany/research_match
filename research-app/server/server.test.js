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

/* **** SETUP **** */
const setup = () => {
  test('/record/add', () => request(webapp).post('/record/add')
  .send(testUser).expect(200)
  .then((response) => {
    expect(JSON.parse(response.text).err).toBeFalsy();
  }));

  test('/record/add-researcher', () => request(webapp).post('/record/add-researcher')
    .send(testResearcher).expect(200)
    .then((response) => {
      expect(JSON.parse(response.text).err).toBeFalsy();
    }));
}

/* **** USER ENDPOINTS **** */
const login = () => {
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
}

const getUser = () => {
  test('/record/:id: get user', () => request(webapp).get('/record/test')
    .expect(200)
    .then((response) => {
      expect(response.body.username).toEqual(testUser.username);
      expect(response.body.phys).toEqual(testUser.phys);
      expect(response.body.psych).toEqual(testUser.psych);
      expect(response.body.med).toEqual(testUser.med);
    }));

  test('/record/:id: get researcher', () => request(webapp).get('/record/rtest')
    .expect(200)  
    .then((response) => {
      expect(response.body.username).toEqual(testResearcher.username);
      expect(response.body.organization).toEqual(testResearcher.organization);
    }));

  test('/record/:id: nonexistent', () => request(webapp).get('/record/fakeuser')
    .expect(200)
    .then((response) => {
      expect(JSON.parse(response.body)).toBeNull();
    }));

  test('/record/studies/:username: existing user', () => request(webapp).get('/record/studies/test')
    .expect(200)  
    .then((response) => {
      expect(response.body.enrolled).toEqual(testUser.enrolled);
    }));

  test('/record/studies/:username: nonexistent', () => request(webapp).get('/record/studies/fakeuser')
    .expect(200));
}

const editUser = () => {
  test('/record/researcher-edit/:username: existing researcher', () => request(webapp).post('/record/researcher-edit/rtest')
    .send(testResearcher)
    .expect(200));

  test('/record/researcher-edit/:username: nonexistent', () => request(webapp).post('/record/researcher-edit/fakeuser')
    .expect(200));

  test('/record/participant-edit/:username: existing participant', () => request(webapp).post('/record/participant-edit/test')
    .send(testUser)
    .expect(200));

  test('/record/participant-edit/:username: nonexistent', () => request(webapp).post('/record/participant-edit/fakeuser')
    .send({ username: 'fake' })
    .expect(200));

  test('/record/updateMessages: existing', () => request(webapp).post('/record/updateMessages/?username=test')
    .send(testUser)
    .expect(200));

  test('/record/updateMessages: nonexistent', () => request(webapp).post('/record/updateMessages/?username=fakeuser')
    .send({ messages: 0 })
    .expect(200));
}

/* **** STUDY ENDPOINTS **** */

/* **** CHAT ENDPOINTS **** */
const chats = () => {
  test('/chats: nonexistent', () => request(webapp).get('/chats?senderName=fake&senderType=0')
    .expect(404));
}

/* **** CLEAN UP **** */
const cleanup = () => {
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
}

setup();
login();
// getUser();
editUser();
// chats();
cleanup();