import { test, expect, beforeEach } from '@jest/globals';
import api from '../modules/user-api';

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

/* **** AUTH TESTS **** */
test('user in db exists', async () => {
  fetch.mockResponseOnce(JSON.stringify(testUser));
  const res = await api.userExists(testUser);
  expect(res).toBe(true);
});

test('user in db does not exist', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.userExists(testUser);
  expect(res).toBe(false);
});

test('check user existence but server error', async () => {
  fetch.mockReject(() => Promise.reject(new Error('Server error')));
  const res = await api.userExists(testUser);
  expect(res).toEqual(false);
});

test('delete user in db', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.deleteUser(testUser);
  expect(res).toBe(true);
});

test('delete user not in db', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.deleteUser({});
  expect(res).toBe(true);
});

test('delete user but server error', async () => {
  fetch.mockReject(() => Promise.reject(Error('Server error')));
  const res = await api.deleteUser(testUser);
  expect(res).not.toEqual(true);
});

/* **** PARTICIPANT TESTS **** */
test('get tags from a user', async () => {
  fetch.mockResponseOnce(JSON.stringify(testUser));
  const res = await api.getUserTags(testUser);
  expect(res).toHaveLength(3);
  expect(res).toContain('diabetes');
  expect(res).toContain('insomnia');
  expect(res).toContain('lexapro');
});

test('get user info', async () => {
  fetch.mockResponseOnce(JSON.stringify(testUser));
  const res = await api.getUserInfo(testUser);
  expect(res).toMatchObject(testUser);
});

test('update user info', async () => {
  const updatedTestUser = {
    username: 'test',
    password: 'testpass12345',
    enrolled: [],
    allergies: [],
    phys: ['diabetes'],
    psych: ['insomnia'],
    med: ['lexapro'],
    studies: [],
  };
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.updateUserInfo(updatedTestUser);
  expect(res).toEqual(true);
});

test('enroll user in a study', async () => {
  const updatedTestUser = {
    username: 'test',
    password: 'testpass',
    enrolled: [2],
    allergies: [],
    phys: ['diabetes'],
    psych: ['insomnia'],
    med: ['lexapro'],
    studies: [],
  };
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.updateEnrolledUser(2, updatedTestUser);
  expect(res).toBeUndefined();
});

test('enroll user in a study but server error', async () => {
  fetch.mockReject(() => Promise.reject(new Error('Server error')));
  const res = await api.updateEnrolledUser(2, {});
  expect(res).toBeUndefined();
});

test('add a new user', async () => {
  fetch.mockResponseOnce(JSON.stringify(testUser));
  const res = await api.postUserInfo(testUser);
  expect(res).toEqual(true);
});

test('add a new user but server error', async () => {
  fetch.mockReject(() => Promise.reject(new Error('Server error')));
  const res = await api.postUserInfo(testUser);
  expect(res).toEqual(false);
});

test('get enrolled study ids with no studies', async () => {
  fetch.mockResponseOnce(JSON.stringify(testUser));
  const res = await api.getEnrolledStudyIds(testUser, () => true);
  expect(res).toHaveLength(0);
});

test('get enrolled study ids with studies', async () => {
  const enrolledTestUser = JSON.parse(JSON.stringify(testUser));
  enrolledTestUser.enrolled = [2, 3, 4, 5];
  fetch.mockResponseOnce(JSON.stringify(enrolledTestUser));
  const res = await api.getEnrolledStudyIds(enrolledTestUser, () => true);
  expect(res).toHaveLength(4);
  expect(res).toContain(2);
  expect(res).toContain(3);
  expect(res).toContain(4);
  expect(res).toContain(5);
});

test('get researcher study ids', async () => {
  fetch.mockResponseOnce(JSON.stringify(testResearcher));
  const res = await api.getResearcherStudies(testResearcher, () => true);
  expect(res).toHaveLength(3);
  expect(res).toContain(2);
  expect(res).toContain(3);
  expect(res).toContain(5);
});
