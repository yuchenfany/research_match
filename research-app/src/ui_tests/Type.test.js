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

// test('button is clicked', () => {
//   const mockSetUser = jest.fn();
//   const user1 = { name: 'user1', highScore: 0, returning: true };
//   render(<Type setUser={mockSetUser} user={user1} />);
//   const input = screen.getByPlaceholderText('Enter username');
//   fireEvent.change(input, { target: { value: 'user1' } });
//   const button = screen.getByRole('button');
//   fireEvent.click(button);
//   expect(mockSetUser).toBeCalled();
// });

test('snapshot test', () => {
  const component = renderer.create( 
    <Router>
        <Type />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});