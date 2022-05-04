/**
 * @jest-environment jsdom
 */

/* eslint-disable react/jsx-filename-extension */

// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('snapshot test', () => {
  const component = renderer.create(
    <Router>
      <App />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
