/*eslint-disable*/

import { test, expect, beforeEach } from '@jest/globals';
import api from '../modules/study-api';

beforeEach(() => {
  fetch.resetMocks();
});

const testResearcher = {
    username: 'rtest',
    password: 'rtestpass',
    organization: 'Penn',
    studies: [0, 2, 3, 5],
    type: 1,
  };

const testStudy = {
    title: "testStudy",
    description: "test",
    compensation: 0,
    duration: 0,
    tags: [],
    participants: [],
    studyId: 0,
    researchers: [],
  };

/* **** AUTH TESTS **** */
test('study in db exists', async () => {
  fetch.mockResponseOnce(JSON.stringify(testStudy));
  const res = await api.getStudyById(testStudy);
  expect(res != null).toBe(true);
});

test('study in db does not exist', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.getStudyById(testStudy);
  expect(res != null).toBe(false);
});

test('delete study in db', async () => {
  fetch.mockResponseOnce(JSON.stringify(null));
  const res = await api.deleteStudy(testStudy);
  expect(res).toBe(true);
});

test('edit study info', async () => {
    const updatedStudy = {
        title: "newteststudy",
        description: "new",
        compensation: 0,
        duration: 0,
        tags: [],
        participants: [],
        studyId: 0,
        researchers: [],
    };
    fetch.mockResponseOnce(JSON.stringify(null));
    const res = await api.editStudy(updatedStudy, () => true);
    expect(res).toBe(true);
});

test('update researcher studies', async () => {
    fetch.mockResponseOnce(JSON.stringify(null));
    const res = await api.updateResearcherStudies(testResearcher, testStudy);
    expect(res).toBe(true);
});






