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

import DeleteAccount from '../components/DeleteAccount';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Are you sure? header', () => {
  render(
    <Router>
      <DeleteAccount />
    </Router>,
  );
  const header = screen.getByText('Are you sure you want to delete your account?');
  expect(header).toBeInTheDocument();
});

test('Go back button is clicked', () => {
  const mockSetUser = jest.fn();
  const mockHandleSubmit = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <DeleteAccount user={user1} setUser={mockSetUser} handleSubmit={mockHandleSubmit} />
    </Router>,
  );

  const button = screen.getByRole('button', {
    name: /go back/i,
  });

  fireEvent.click(button);
  expect(mockedUsedNavigate).toBeCalled();
});

test('Delete account button is clicked', () => {
  const mockSetUser = jest.fn();
  const mockHandleSubmit = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <DeleteAccount user={user1} setUser={mockSetUser} handleSubmit={mockHandleSubmit} />
    </Router>,
  );

  const button = screen.getByRole('button', {
    name: /delete account/i,
  });

  fireEvent.click(button);
  expect(mockSetUser).toBeCalled();
});

test('snapshot test', () => {
  const component = renderer.create(
    <Router>
      <DeleteAccount />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
