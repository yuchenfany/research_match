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

import ResearcherEdit from '../components/ResearcherEdit';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title Edit Researcher Profile', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Edit Researcher Profile");
  expect(label).toBeInTheDocument();
});

test('find name text', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Name");
  expect(label).toBeInTheDocument();
});

test('find organization text', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const label = screen.getByText("Organization");
  expect(label).toBeInTheDocument();
});

test('single input value  sequence', () => {
  const mockUser = {
    username: '', password: '',
  };
  const mockSetUser = jest.fn();

  render(
    <Router>
      <ResearcherEdit user={mockUser} setUser={mockSetUser} />
    </Router>,
  );

  const input = screen.getByPlaceholderText('name');
  fireEvent.change(input, { target: { value: 'user1' } });
  expect(input.value).toEqual('user1');
  expect(mockSetUser).toHaveBeenCalled();

  const input2 = screen.getByPlaceholderText('organization');
  fireEvent.change(input2, { target: { value: 'user1pass' } });
  expect(input2.value).toEqual('user1pass');
  expect(mockSetUser).toHaveBeenCalled();

  // fireEvent.click(screen.getByDisplayValue('SUBMIT'));
});

test('Update Button good name',() => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass', name: 'hiya', organization: "UPenn" };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /update/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('Update Button empty name',() => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass', name: '', organization: 'UPenn' };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /update/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('Update Button empty organization',() => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass', name: 'yes sirr', organization: '' };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /update/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

test('Cancel Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
    render(
        <Router>
            <ResearcherEdit user={user1} setUser={mockSetUser} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /cancel/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});


test('snapshot test', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  
  const notification = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
  const component = renderer.create( 
    <Router>
        <ResearcherEdit user={user1} setUser={mockSetUser} />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
//TO GET HIGHER SCORE

//1. fireevent update button can not be clicked
