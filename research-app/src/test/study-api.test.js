/*eslint-disable*/

import { test, expect, beforeEach } from '@jest/globals';
import api from '../modules/study-api';

require('jest-fetch-mock').enableMocks();


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
    tags: ['diabetes'],
    participants: ['test'],
    studyId: 0,
    researchers: [],
  };

  const testUser = {
    username: 'test',
    password: 'testpass',
    enrolled: ['testStudy'],
    allergies: [],
    phys: ['diabetes'],
    psych: ['insomnia'],
    med: ['lexapro'],
    type: 0,
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

test('get study participants', async () => {
    fetch.mockResponses(
        [
          JSON.stringify(testStudy),
          { status: 200 }
        ],
        [
          JSON.stringify(testUser),
          { status: 200 }
        ],
      )
    const res = await api.getStudyParticipants(testStudy);
    expect(res).toMatchObject([testUser]);
});

test('remove study for participants', async () => {
    fetch.mockResponses(
        [
          JSON.stringify(null),
          { status: 200 }
        ],
        [
          JSON.stringify(null),
          { status: 200 }
        ],
      )
    fetch.mockResponseOnce(JSON.stringify(null));
    const res = await api.removeStudyForParticipants(testStudy, [testUser]);
    const final = await api.getStudyParticipants(testStudy);
    expect(final).toMatchObject([]);
});

test('get study by id', async () => {
    fetch.mockResponseOnce(JSON.stringify(testStudy));
    const res = await api.getStudyById(testStudy.studyId);
    expect(res).toMatchObject(testStudy);
});

test('get study by tag', async () => {
    fetch.mockResponseOnce(JSON.stringify(testStudy));
    const res = await api.getStudyByTag('diabetes');
    expect(res).toMatchObject(testStudy);
});

test('update study', async () => {
    const newStudy = {
        title: "newStudy",
        description: "test",
        compensation: 0,
        duration: 0,
        tags: ['diabetes'],
        participants: ['test'],
        studyId: 0,
        researchers: [],
      };
    fetch.mockResponseOnce(JSON.stringify(true));
    const res = await api.updateEnrolledStudy(newStudy);
    expect(res).toBe(true);
});

test('get researcher num studies', async () => {
    fetch.mockResponseOnce(JSON.stringify([0, 1, 2, 3]));
    const res = await api.getResearcherNumStudies(testResearcher);
    expect(res).toEqual(4);
});

test('get researcher num participants', async () => {
    fetch.mockResponseOnce(JSON.stringify(null));
    const res = await api.getResearcherNumParticipants(testResearcher);
    expect(res).toEqual(0);
});

test('get researcher num tags', async () => {
    fetch.mockResponseOnce(JSON.stringify([testStudy]));
    const res = await api.getResearcherNumTags(testResearcher);
    expect(res).toEqual(1);
});

test('test get researcher tags no tags', async () => {
    const testResearcher = {
        username: 'rtest',
        password: 'rtestpass',
        organization: 'Penn',
        studies: [],
        type: 1,
      };
    fetch.mockResponseOnce(JSON.stringify([]));
    const res = await api.getResearcherNumTags(testResearcher);
    expect(res).toBe(0);
});












