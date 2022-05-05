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

import Create from '../components/Create';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Sign Up header', () => {
  render(
    <Router>
      <Create />
    </Router>,
  );
  const header = screen.getByText('Sign Up');
  expect(header).toBeInTheDocument();
});

test('CREATE USERNAME label', () => {
  render(
    <Router>
      <Create />
    </Router>,
  );
  const label = screen.getByText('CREATE USERNAME');
  expect(label).toBeInTheDocument();
});

test('CREATE PASSWORD label', () => {
  render(
    <Router>
      <Create />
    </Router>,
  );
  const label = screen.getByText('CREATE PASSWORD');
  expect(label).toBeInTheDocument();
});

test('CREATE ACCOUNT button is clicked', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <Create setUser={mockSetUser} user={user1} />
    </Router>,
  );
  const input = screen.getByPlaceholderText('Create username');
  fireEvent.change(input, { target: { value: 'user1' } });
  const button = screen.getByRole('button', {
    name: /create account/i,
  });

  fireEvent.click(button);
  expect(mockSetUser).toBeCalled();
});

test('Back to login button is clicked: valid input', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <Create setUser={mockSetUser} user={user1} />
    </Router>,
  );
  const input = screen.getByPlaceholderText('Create username');
  fireEvent.change(input, { target: { value: 'user1' } });

  const inputPassword = screen.getByPlaceholderText('Create password');
  fireEvent.change(inputPassword, { target: { value: 'user1pass' } });

  const button = screen.getByRole('button', {
    name: /back to login/i,
  });

  fireEvent.click(button);
  expect(mockSetUser).toBeCalled();
});

test('snapshot test', () => {
  const component = renderer.create(
    <Router>
      <Create />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
