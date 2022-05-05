/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import Login from '../components/Login';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Login header', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  const header = screen.getByText('Research Match');
  expect(header).toBeInTheDocument();
});

test('Login username', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  const label = screen.getByText('USERNAME');
  expect(label).toBeInTheDocument();
});

test('Login submit', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  fireEvent.click(screen.getByDisplayValue('SUBMIT'));
});

test('Login new user sign-up', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  fireEvent.click(screen.getByText('New user sign-up'));
  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test('Login sequence', () => {
  const mockUser = {
    username: '', password: '',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );

  const input = screen.getByPlaceholderText('username');
  fireEvent.change(input, { target: { value: 'user1' } });
  expect(input.value).toEqual('user1');
  expect(mockSetUser).toHaveBeenCalled();

  const input2 = screen.getByPlaceholderText('password');
  fireEvent.change(input2, { target: { value: 'user1pass' } });
  expect(input2.value).toEqual('user1pass');
  expect(mockSetUser).toHaveBeenCalled();

  fireEvent.click(screen.getByDisplayValue('SUBMIT'));
});

// test('Login sequence no password', () => {
//   const mockUser = {
//     username: '', password: '',
//   };
//   const mockSetUser = jest.fn();

//   render(
//     <Router>
//       <Login user={mockUser} setUser={mockSetUser} />
//     </Router>,
//   );

//   const input2 = screen.getByPlaceholderText('password');
//   fireEvent.change(input2, { target: { value: 'user1pass' } });
//   expect(input2.value).toEqual('user1pass');
//   expect(mockSetUser).toHaveBeenCalled();

//   fireEvent.click(screen.getByDisplayValue('SUBMIT'));
//   const error = renderer.create(
//     <span>Please enter your username</span>,
//   );
//   expect(error).toBeInTheDocument();
// });

test('snapshot test', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };
  const mockSetUser = jest.fn();

  const component = renderer.create(
    <Router>
      <Login user={mockUser} setUser={mockSetUser} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
