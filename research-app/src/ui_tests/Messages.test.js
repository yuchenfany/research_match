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

import Messages from '../components/Messages';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('Messages header', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };

  render(
    <Router>
      <Messages user={mockUser} />
    </Router>,
  );
  const header = screen.getByText('My Messages');
  expect(header).toBeInTheDocument();
});

// test('Messages view', () => {
//   const mockUser = {
//     username: 'fakename', password: 'fakepass',
//   };

//   render(
//     <Router>
//       <Messages user={mockUser} />
//     </Router>,
//   );
//   fireEvent.click(screen.getByRole('button'));
// });

test('snapshot test', () => {
  const mockUser = {
    username: 'fakename', password: 'fakepass',
  };

  const component = renderer.create(
    <Router>
      <Messages user={mockUser} />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
