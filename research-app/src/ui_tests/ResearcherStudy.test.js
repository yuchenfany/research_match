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

import ResearcherStudy from '../components/ResearcherStudy';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

test('Title label', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherStudy study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} status={status} setStatus={mockSetStatus} />
        </Router>);  
  const label = screen.getByText("Description");
  expect(label).toBeInTheDocument();
});

// test('participant clicked',() => {
//   render(
//     <Router>
//         <Study />
//     </Router>); 
// // fireEvent.click(screen.getByTestId('participant'));
// expect(screen.getByTestId('participant')).toBeInTheDocument();
// //   expect(screen.getByTestId('participant')).toBeChecked();
// });

test('Enroll Button',() => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
    render(
        <Router>
            <ResearcherStudy study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} status={status} setStatus={mockSetStatus} />
        </Router>);  
  const linkElement = screen.getByRole('button', {
    name: /Edit Study/i,
  });
  fireEvent.click(linkElement);
  expect(linkElement).toBeInTheDocument();
});

// // test('Researcher Button',() => {
// //   const mockSetUser = jest.fn();
// //   const user1 = { username: 'user1', password: 'user1pass' };
// //   render(
// //     <Router>
// //       <Type setUser={mockSetUser} user={user1} />
// //     </Router>,
// //   );
// //   const linkElement = screen.getByRole('radio', {
// //     name: /researcher/i
// //   });
// //   fireEvent.click(linkElement);
// //   // expect(mockSetUser).toBeCalled();
// //   expect(linkElement).toBeInTheDocument();
// // });
// test('researcher clicked',() => {
//   render(
//     <Router>
//         <Study />
//     </Router>); 
//   // fireEvent.click(screen.getByTestId('researcher'));
//   expect(screen.getByTestId('researcher')).toBeInTheDocument();
//   // expect(screen.getByTestId('researcher')).toBeChecked();
// });

test('snapshot test', () => {
  const mockSetUser = jest.fn();
  const user1 = { username: 'user1', password: 'user1pass' };
  const mockSetStatus = jest.fn();
  const status = false;
  const mockSetStudy = jest.fn();
  const study = {
    studyId: '',
    participants: [''],
    researchers: [],
    tags: [],
  };
  const component = renderer.create( 
    <Router>
        <ResearcherStudy study={study} setStudy={mockSetStudy} user={user1} setUser={mockSetUser} status={status} setStatus={mockSetStatus} />
    </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});