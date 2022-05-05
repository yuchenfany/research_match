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

import Chat from '../components/Chat';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// test('Chat sequence', () => {
//   const mockSender = {
//     username: 'fakename', password: 'fakepass', type: 0,
//   };
//   const mockUser = {
//     username: 'sendername', type: 1,
//   };
//   const mockSetUser = jest.fn();
//   const mockSetSender = jest.fn();

//   render(
//     <Router>
//       <Chat
//         sender={mockSender}
//         setSender={mockSetSender}
//         user={mockUser}
//         mockSetUser={mockSetUser}
//       />
//     </Router>,
//   );
//   const chatInput = screen.getByTitle('chat-input');
//   fireEvent.click(chatInput);
//   fireEvent.click(screen.getByText('SEND'));
// });

// test('snapshot test', () => {
//   const mockSender = {
//     username: 'fakename', password: 'fakepass', type: 0,
//   };
//   const mockUser = {
//     username: 'sendername', type: 1,
//   };
//   const mockSetUser = jest.fn();
//   const mockSetSender = jest.fn();

//   const component = renderer.create(
//     <Router>
//       <Chat
//         sender={mockSender}
//         setSender={mockSetSender}
//         user={mockUser}
//         mockSetUser={mockSetUser}
//       />
//     </Router>,
//   );
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
