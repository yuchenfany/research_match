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

import DisplayStudies from '../components/DisplayStudies';
import NavBar from '../components/NavBar';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Eligible studies header', () => {
  const mockUser = { username: 'username', password: 'password', type: 0 };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <DisplayStudies user={mockUser} setUser={mockSetUser} />
      <NavBar user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  const header = screen.getByText('Eligible Studies');
  expect(header).toBeInTheDocument();
});

test('snapshot test', () => {
  const mockUser = { username: 'username', password: 'password', type: 0 };
  const mockSetUser = jest.fn();

  const component = renderer.create(
    <Router>
      <DisplayStudies user={mockUser} setUser={mockSetUser} />
      <NavBar user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
