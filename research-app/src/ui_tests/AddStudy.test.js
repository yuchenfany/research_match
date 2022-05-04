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

import AddStudy from '../components/AddStudy';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Create Study header', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);
  const header = screen.getByText('Create Study');
  expect(header).toBeInTheDocument();
});

test('Title label', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);  
  const label = screen.getByText('Title');
  expect(label).toBeInTheDocument();
});

test('Description label', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);  const label = screen.getByText('Description');
  expect(label).toBeInTheDocument();
});

test('Compensation label', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);  const label = screen.getByText('Compensation');
  expect(label).toBeInTheDocument();
});

test('Duration label', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);  const label = screen.getByText('Duration');
  expect(label).toBeInTheDocument();
});

test('Tags label', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);  
  const label = screen.getByText('Tags');
  expect(label).toBeInTheDocument();
});

test('should be able to type input', () => {
  render(
    <Router>
        <AddStudy />
    </Router>);
  // const input = screen.getByPlaceholderText('title');
  // fireEvent.change(input, { target: { value: 'test input' } });
  // expect(input.value).toBe('test input');

  expect(screen.getByDisplayValue('test')).toHaveAttribute('id', 'title');
});

test('snapshot test', () => {
  const component = renderer.create(
    <Router>
        <AddStudy />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
