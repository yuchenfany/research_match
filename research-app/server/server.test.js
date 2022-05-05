// jest --coverage --forceExit -- server.test.js
import { test, expect, beforeAll } from '@jest/globals';

const request = require('supertest');
// const { MongoClient } = require('mongodb');

// import our web app
const webapp = require('./server');

// require('dotenv').config({ path: './config.env' });
beforeAll(async () => {
  // try{
  //     const conn = (await MongoClient.connect(url,
  //     {useNewUrlParser: true, useUnifiedTopology: true})).db();
  //     console.log(`Connected to the database: ${conn.databaseName}`);
  //     return conn;
  // } catch(err){
  //     console.error(err);
  //     throw new Error('could not connect to the db');
  // }
});

/* **** USER ENDPOINTS **** */
test('/login endpoint status code and response 404', () => request(webapp).post('/record/login')
  .send({ username: '' }).expect(404)
  .then((response) => expect(JSON.parse(response.text).error).toBe('username not provided')));

test('status code 201 and response', () => request(webapp).post('/login')
  .send({ username: 'testuser', password: 'testuserpass' })
  .expect(201) // test the response status code
  // process the response
  .then((response) => expect(JSON.parse(response.text).message).toContain('Player with id')));

/* **** STUDY ENDPOINTS **** */

/* **** CHAT ENDPOINTS **** */
