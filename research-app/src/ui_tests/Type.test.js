/**
 * @jest-environment jsdom
 */

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// import { jest } from '@jest/globals';

import Type from '../components/Type';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title label', () => {
    render(
        <Router>
            <Type />
        </Router>);  
  const label = screen.getByText('Select account type');
  expect(label).toBeInTheDocument();
});

test('participant clicked',() => {
  render(
    <Router>
        <Type />
    </Router>); 
// fireEvent.click(screen.getByTestId('participant'));
expect(screen.getByTestId('participant')).toBeInTheDocument();
//   expect(screen.getByTestId('participant')).toBeChecked();
});

test('Login Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <Type setUser={mockSetUser} user={user1} />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /confirm/i,
  });
  fireEvent.click(linkElement);
  // expect(mockSetUser).toBeCalled();
  expect(linkElement).toBeInTheDocument();
});

test('Researcher Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <Type setUser={mockSetUser} user={user1} />
    </Router>,
  );
  const linkElement = screen.getByRole('radio', {
    name: /researcher/i
  });
  fireEvent.click(linkElement);
  // expect(mockSetUser).toBeCalled();
  expect(linkElement).toBeInTheDocument();
});

test('Participant Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  render(
    <Router>
      <Type setUser={mockSetUser} user={user1} />
    </Router>,
  );
  const linkElement = screen.getByRole('radio', {
    name: /participant/i
  });
  fireEvent.click(linkElement);
  // expect(mockSetUser).toBeCalled();
  expect(linkElement).toBeInTheDocument();
});

test('researcher clicked',() => {
  render(
    <Router>
        <Type />
    </Router>); 
  // fireEvent.click(screen.getByTestId('researcher'));
  expect(screen.getByTestId('researcher')).toBeInTheDocument();
  // expect(screen.getByTestId('researcher')).toBeChecked();
});

test('snapshot test', () => {
  const component = renderer.create( 
    <Router>
        <Type />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});