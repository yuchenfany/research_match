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

import ResearcherDashboard from '../components/ResearcherDashboard';

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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("Analytics");
  expect(label).toBeInTheDocument();
});

test('TOTAL ? text', () => {
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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("TOTAL ?");
  expect(label).toBeInTheDocument();
});

test('TOTAL STUDIES text', () => {
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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("TOTAL STUDIES");
  expect(label).toBeInTheDocument();
});

test('TOTAL MESSAGES SENT text', () => {
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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("TOTAL MESSAGES SENT");
  expect(label).toBeInTheDocument();
});

test('TOTAL NUMBER OF PARTICIPANTS', () => {
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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("TOTAL NUMBER OF PARTICIPANTS");
  expect(label).toBeInTheDocument();
});
test('TOTAL NUMBER OF PARTICIPANTS', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: null, password: 'user1pass' };
  
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
            <ResearcherDashboard user={user1} />
        </Router>);  
  const label = screen.getByText("forbidden");
  expect(label).toBeInTheDocument();
});
// test('Update Button',() => {
//   const Button = ({onClick, children}) => (
//     <button onClick={onClick}>{children}</button>
//   )
//   const mockSetUser = jest.fn();
//   const user1 = { username: 'user1', password: 'user1pass' };
//     render(
//         <Router>
//             <ResearcherDashboard user={user1} />
//         </Router>);  
//   const linkElement = screen.getByRole('button', {
//     name: /update/i,
//   });
//   const handleClick = jest.fn()
//   render(<Button onClick={handleClick}>updatee</Button>)
//   fireEvent.click(screen.getByText(/updatee/i));
//   expect(linkElement).toBeInTheDocument();
// });


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
        <ResearcherDashboard user={user1} />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
//TO GET HIGHER SCORE

//1. Get the json values out from the dashboard and test the values are there
