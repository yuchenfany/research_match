/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import EditStudy from '../components/EditStudy';
import NavBar from '../components/NavBar';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Edit Study studies header', () => {
  const mockStudy = {
    title: 'title', description: 'description', duration: 0, leadResearcher: 'lead',
  };
  const mockSetStudy = jest.fn();

  render(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const header = screen.getByText('Edit Study');
  expect(header).toBeInTheDocument();
});

test('snapshot test', () => {
  const mockStudy = {
    title: 'title', description: 'description', duration: 0, leadResearcher: 'lead',
  };
  const mockSetStudy = jest.fn();

  const component = renderer.create(
    <Router>
      <EditStudy study={mockStudy} setStudy={mockSetStudy} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
